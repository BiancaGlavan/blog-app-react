import ArticleSkeleton from "../components/skeletons/skeletonsComponents/ArticleSkeleton";
import ArticlesSkeletonList from "../components/skeletons/skeletonsComponents/ArticlesSkeletonList";
import HomepageArticlesListSkeleton from "../components/skeletons/skeletonsComponents/HomepageArticlesListSkeleton";
import ArticlesPageSkeleton from "../components/skeletons/skeletonsPages/ArticlesPageSkeleton";


const SkeletonPage = () => {
  return (
    <div>
        <HomepageArticlesListSkeleton isRow />
    </div>
  )
}

export default SkeletonPage;