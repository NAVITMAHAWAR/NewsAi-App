// eslint-disable-next-line no-unused-vars
import React from "react";
import { Tabs } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./ArticleCard";
import { Skeleton } from "@mantine/core";
import { Divide } from "lucide-react";

const Category = () => {
  const [category, setCategory] = useState("general");
  console.log(category);
  const Categories = [
    "General",
    "Sports",
    "Politics",
    "Business",
    "Entertainment",
    "Health",
    "Science",
  ];

  const fetchNewsByCategory = async ({ pageParam = 1 }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/news/${category}`,
        { params: { page: pageParam } }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["category", category],
    queryFn: fetchNewsByCategory,
    initialPageParam: 1,
    getNextPageParam: (lastpage) => {
      // console.log("lastpage", lastpage);

      return lastpage.nextPage;
    },
  });
  console.log(data);

  return (
    <div>
      <h1 className="text-center space-y-10 font-bold  text-2xl">Categories</h1>

      <Tabs
        defaultValue="gallery"
        onChange={(value) =>
          setCategory(value ? value.toLocaleLowerCase() : "")
        }
      >
        <Tabs.List>
          {Categories.map((cat) => (
            <Tabs.Tab key={cat} value={cat}>
              {cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <div className="mt-14">
        <InfiniteScroll
          dataLength={
            data?.pages.length >= 0 &&
            data?.pages.reduce((total, page) => total + page.news.length, 0)
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            <p style={{ textAlign: "center", margin: "20px 20px" }}>
              Loading...
            </p>
          }
          endMessage={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No More News
            </p>
          }
        >
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton height={1000} />
              <Skeleton height={20} />
              <Skeleton height={30} />
            </div>
          ) : (
            <div className="space-y-6">
              {data?.pages.length >= 0 &&
                data?.pages.map((page, index) =>
                  page.news.map((article) => (
                    <ArticleCard
                      key={article.id || index}
                      article={article}
                      category={category}
                    />
                  ))
                )}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Category;

// <Tabs.List>
// 				  <Tabs.Tab
// 					leftSection={<BookMarked size={16} color="green" />}
// 					value="Bookmark"
// 				  >
// 					Bookmark
// 				  </Tabs.Tab>
// 				  <Tabs.Tab
// 					leftSection={<Heart size={16} color="red" />}
// 					value="messages"
// 				  >
// 					Liked News
// 				  </Tabs.Tab>
// 				  <Tabs.Tab
// 					leftSection={<Cog size={16} color="pink" />}
// 					value="preferences"
// 				  >
// 					Preferences
// 				  </Tabs.Tab>
// 				  <Tabs.Tab
// 					leftSection={<Bot size={16} color="green" />}
// 					value="ai-recommandations"
// 				  >
// 					AI Recommandations
// 				  </Tabs.Tab>
