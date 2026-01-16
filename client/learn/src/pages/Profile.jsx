// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

import { Avatar, Button, Container, Text } from "@mantine/core";
import { Tabs } from "@mantine/core";
import { BookMarked, Heart, Cog, Bot, BookOpenText } from "lucide-react";
import { getCookie } from "../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { getReadingHistory } from "../redux/Slice/newsSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { readingHistory } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getReadingHistory());
  }, []);
  return (
    <Container className="max-w-2x1 mx-auto mb-10">
      <div className="flex mt-8 mb-4 ">
        <Avatar size={100} />
        <div className="ml-4 flex flex-col justify-center">
          <Text size="lg" fw={900}>
            {getCookie("name")?.toUpperCase()}
          </Text>
          <Text>{getCookie("email")}</Text>
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="bg-blue-500 text-white rounded-2xl w-40 flex justify-center">
          📌 Bookmarks: 5
        </div>

        <div className=" bg-green-500 text-white rounded-2xl w-45 flex justify-center">
          📖 Reading History:
          {readingHistory.length > 0 ? readingHistory.length : 0}
        </div>
      </div>

      <Button variant="outline" className="w-full mb-8" fullWidth>
        Edit Profile
      </Button>

      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab
            leftSection={<BookMarked size={16} color="green" />}
            value="Bookmark"
          >
            Bookmark
            {}
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<Heart size={16} color="red" />}
            value="Liked News"
          >
            Liked News
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<Cog size={16} color="pink" />}
            value="preferences"
          >
            Preferences
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<Bot size={16} color="green" />}
            value="ai-recommandations"
          >
            AI Recommandations
          </Tabs.Tab>
          <Tabs.Tab
            leftSection={<BookOpenText size={16} color="blue" />}
            value="reading-history"
          >
            Reading History
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="reading-history">
          {readingHistory.length > 0
            ? readingHistory.map((rh) => (
                <div key={rh._id}>
                  <p>{rh._id}</p>
                  <p>{rh.title}</p>
                  <div>{rh.content}</div>
                </div>
              ))
            : null}
        </Tabs.Panel>

        <Tabs.Panel value="preferences">Prefrences</Tabs.Panel>

        <Tabs.Panel value="Bookmark">Add Bookmark</Tabs.Panel>

        <Tabs.Panel value="ai-recommandations">Ai Recommandations</Tabs.Panel>

        <Tabs.Panel value="Liked News">Liked News</Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default Profile;
