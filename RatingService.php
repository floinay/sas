<?php
namespace Modules\Ratings\Services;

use App\Entities\Courses\Course;
use App\Helpers\CurrentUser;
use Modules\Users\Entities\User;

class RatingService
{
    private User $user;
    private int $college_id;

    public function user(int $userId): RatingService
    {
        $this->user = User::find($userId);
        return $this;
    }

    public function collegeId(int $college_id): RatingService
    {
        $this->college_id = $college_id;
        return $this;
    }

    public function isMyReview(): bool
    {
        $reviews = !CurrentUser::guest() ? $this->user->reviews()->myFirst(CurrentUser::id())->inCollege($this->college_id) : $this->user->reviews()->inCollege($this->college_id);

        foreach ($reviews->get() as $review) {
            if ($review->is_my) return true;
        }

        return false;
    }

    public function isAllow(): bool
    {
        if (empty($this->myLearningCoursesIdsFromTeacher())) {
            return false;
        }

        if (CurrentUser::guest()) {
            return false;
        }

        return true;
    }

    public function rating(): ?float
    {
        $rating = 0;

        foreach ($this->user->reviews as $review) {
            $rating += $review->rating;
        }

        return $this->user->settings->reviews_count ? $rating / $this->user->settings->reviews_count : 0;
    }

    public function update()
    {
        $this->updateReviewsCount();
        $this->updateRating();
    }

    private function updateRating()
    {
        $this->user->settings->rating = $this->rating();
        $this->user->saveOrFail();
    }

    private function updateReviewsCount()
    {
        $this->user->settings->reviews_count = $this->user->reviews()->count();
        $this->user->saveOrFail();
    }

    private function myLearningCoursesIdsFromTeacher(): ?array
    {
        $myCoursesIds      = [];
        $teacherCoursesIds = [];
        $myCourses         = !CurrentUser::guest() ? CurrentUser::user()->courses()->where('status', Course::ACTIVE)->where('user_id', '!=', $this->user->id)->get() : [];
        $teacherCourses    = $this->user->teaches_courses()->where('status', Course::ACTIVE)->get();

        foreach ($myCourses as $course) {
            $myCoursesIds[] = $course->id;
        }

        foreach ($teacherCourses as $course) {
            $teacherCoursesIds[] = $course->id;
        }

        $courseIds = array_intersect($myCoursesIds, $teacherCoursesIds);

        return count($courseIds) ? $courseIds : null;
    }
}
