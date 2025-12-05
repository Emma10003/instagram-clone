import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Home, Search, PlusSquare, Film, User } from 'lucide-react';

export default function InstagramUI() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            username: 'travel_photos',
            userAvatar: 'https://picsum.photos/seed/user1/150/150',
            postImage: 'https://picsum.photos/seed/post1/600/600',
            likes: 1234,
            caption: 'Beautiful sunset at the mountains 🌄',
            comments: 45,
            timeAgo: '2시간 전',
            liked: false
        },
        {
            id: 2,
            username: 'food_lover',
            userAvatar: 'https://picsum.photos/seed/user2/150/150',
            postImage: 'https://picsum.photos/seed/post2/600/600',
            likes: 856,
            caption: 'Delicious brunch today 🍳☕',
            comments: 23,
            timeAgo: '5시간 전',
            liked: false
        },
        {
            id: 3,
            username: 'city_explorer',
            userAvatar: 'https://picsum.photos/seed/user3/150/150',
            postImage: 'https://picsum.photos/seed/post3/600/600',
            likes: 2341,
            caption: 'City lights at night ✨🌃',
            comments: 67,
            timeAgo: '1일 전',
            liked: false
        }
    ]);

    const [stories] = useState([
        { id: 1, username: 'your_story', avatar: 'https://picsum.photos/seed/story1/150/150', hasStory: true, isYou: true },
        { id: 2, username: 'friend_1', avatar: 'https://picsum.photos/seed/story2/150/150', hasStory: true },
        { id: 3, username: 'friend_2', avatar: 'https://picsum.photos/seed/story3/150/150', hasStory: true },
        { id: 4, username: 'friend_3', avatar: 'https://picsum.photos/seed/story4/150/150', hasStory: true },
        { id: 5, username: 'friend_4', avatar: 'https://picsum.photos/seed/story5/150/150', hasStory: true },
    ]);

    const toggleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId
                ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
                : post
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold font-serif">Instagram</h1>
                    <div className="flex items-center gap-6">
                        <Home className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                        <MessageCircle className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                        <PlusSquare className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                        <Film className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                        <User className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-2">
                        {/* Stories */}
                        <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 overflow-x-auto">
                            <div className="flex gap-4">
                                {stories.map(story => (
                                    <div key={story.id} className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0">
                                        <div className={`w-16 h-16 rounded-full p-0.5 ${story.hasStory ? 'bg-gradient-to-tr from-yellow-400 to-pink-600' : 'bg-gray-300'}`}>
                                            <img
                                                src={story.avatar}
                                                alt={story.username}
                                                className="w-full h-full rounded-full border-2 border-white object-cover"
                                            />
                                        </div>
                                        <span className="text-xs">{story.isYou ? '내 스토리' : story.username}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Posts */}
                        {posts.map(post => (
                            <div key={post.id} className="bg-white border border-gray-300 rounded-lg mb-6">
                                {/* Post Header */}
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.userAvatar}
                                            alt={post.username}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <span className="font-semibold text-sm">{post.username}</span>
                                    </div>
                                    <MoreHorizontal className="w-6 h-6 cursor-pointer" />
                                </div>

                                {/* Post Image */}
                                <img
                                    src={post.postImage}
                                    alt="Post"
                                    className="w-full aspect-square object-cover"
                                />

                                {/* Post Actions */}
                                <div className="p-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-4">
                                            <Heart
                                                className={`w-7 h-7 cursor-pointer ${post.liked ? 'fill-red-500 text-red-500' : ''}`}
                                                onClick={() => toggleLike(post.id)}
                                            />
                                            <MessageCircle className="w-7 h-7 cursor-pointer" />
                                            <Send className="w-7 h-7 cursor-pointer" />
                                        </div>
                                        <Bookmark className="w-7 h-7 cursor-pointer" />
                                    </div>

                                    {/* Likes */}
                                    <p className="font-semibold text-sm mb-2">좋아요 {post.likes.toLocaleString()}개</p>

                                    {/* Caption */}
                                    <p className="text-sm mb-2">
                                        <span className="font-semibold mr-2">{post.username}</span>
                                        {post.caption}
                                    </p>

                                    {/* Comments */}
                                    <button className="text-sm text-gray-500 mb-2">
                                        댓글 {post.comments}개 모두 보기
                                    </button>

                                    {/* Time */}
                                    <p className="text-xs text-gray-400">{post.timeAgo}</p>
                                </div>

                                {/* Comment Input */}
                                <div className="border-t border-gray-300 p-3 flex items-center gap-3">
                                    <input
                                        type="text"
                                        placeholder="댓글 달기..."
                                        className="flex-1 outline-none text-sm"
                                    />
                                    <button className="text-blue-500 font-semibold text-sm">게시</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20">
                            {/* User Profile */}
                            <div className="flex items-center gap-3 mb-6">
                                <img
                                    src="https://picsum.photos/seed/myprofile/150/150"
                                    alt="Your profile"
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-sm">your_username</p>
                                    <p className="text-gray-500 text-sm">Your Name</p>
                                </div>
                            </div>

                            {/* Suggestions */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-gray-500 font-semibold text-sm">회원님을 위한 추천</p>
                                    <button className="text-xs font-semibold">모두 보기</button>
                                </div>
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                                            <div>
                                                <p className="font-semibold text-sm">suggested_user_{i}</p>
                                                <p className="text-gray-500 text-xs">회원님을 위한 추천</p>
                                            </div>
                                        </div>
                                        <button className="text-blue-500 text-xs font-semibold">팔로우</button>
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-8 text-xs text-gray-400">
                                <p>정보 · 도움말 · 홍보 센터 · API · 채용 정보</p>
                                <p className="mt-4">© 2025 INSTAGRAM FROM META</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}