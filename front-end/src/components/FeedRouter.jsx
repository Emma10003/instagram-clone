import {useSearchParams} from "react-router-dom";
import UserFeedPage from "../pages/UserFeedPage";
import MyFeedPage from "../pages/MyFeedPage";

const FeedRouter = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');

    if(userId) {
        return <UserFeedPage userId={Number(userId)} />
    }

    return <MyFeedPage />

}

export default FeedRouter;