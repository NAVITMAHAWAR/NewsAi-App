/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  Image,
  Badge,
  Text,
  Group,
  ActionIcon,
  Flex,
  Tooltip,
  Modal,
  Popover,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Eye, Sparkles, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const ArticleCard = ({ article, category }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const handleSummarize = async () => {
    open();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/summarize`,
        {
          url: article.url,
        }
      );
      setIsLoading(false);
      setSummary(res.data.summary);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      className="flex flex-row gap-6"
    >
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          h={200}
          w="auto"
          fit="contain"
          radius="md"
          className="object-cover"
        />
      )}
      <div className="flex-1">
        <Badge color="yellow" variant="light">
          {category}
        </Badge>
        <h2
          className="cursor-pointer text-xl hover:text-amber-500 hover:underline mt-2"
          onClick={() => window.open(article.url, "_blank")}
        >
          {article.title}
        </h2>
        <Text size="sm" color="gray" mt="sm">
          {article.description}
        </Text>

        <Group mt="md" spacing="xs">
          <Flex align="center" gap="xs">
            <Eye size={16} />
            <Text size="sm">
              {article.views || Math.floor(Math.random() * 500)}
            </Text>
          </Flex>

          <Tooltip
            // label={bookmarks ? "Bookmark this article" : "Remove Bookmark"}
            withArrow
            position="top"
          >
            <ActionIcon
              //   onClick={() => toogleBookmarks(article)}
              variant="outline"
              size="sm"
              //   color={bookmarks ? 'blue' : 'red'}
            >
              {/* <Bookmark size={18} fill={bookmarks ? null : "currentColor"} /> */}
            </ActionIcon>
          </Tooltip>

          <Popover
            // opened={opened}
            // onChange={setOpened}
            // width={isLoading ? 350 : 500}
            position="bottom"
            withArrow
            shadow="md"
          >
            <Popover.Target>
              <Tooltip label="Generate Summary" withArrow position="top">
                <ActionIcon
                  variant="gradient"
                  onClick={handleSummarize}
                  size="md"
                  color="yellow"
                  gradient={{ from: "blue", to: "cyan", deg: 330 }}
                >
                  <Sparkles size={18} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            {/* <Popover.Dropdown style={{ minHeight: isLoading ? 150 : "auto" }}>
              {isLoading ? (
                <Flex align="center" justify="center" gap="sm">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Sparkles size={30} className="text-sky-500" />
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500"
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Generating...
                  </motion.span>
                </Flex>
              ) : (
                <motion.div>
                  {summary.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      className="text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {word}{" "}
                    </motion.span>
                  ))}
                  <Flex justify="flex-end" mt="sm">
                    <Tooltip
                      label={copySuccess ? "Copied!" : "Copy summary"}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        variant="outline"
                        size="sm"
                        color="blue"
                        onClick={handleCopy}
                      >
                        <Copy size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                </motion.div>
              )}
            </Popover.Dropdown> */}
          </Popover>
        </Group>
      </div>
      <Modal size="md" opened={opened} onClose={close} title="Summary">
        {isLoading ? (
          <div className="h-full flex justify-center gap-4 items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              transition={{ repeat: Infinity, delay: 1 }}
            >
              <Sparkles size={20} className="animate-pulse text-sky-500" />
            </motion.span>
            <motion.span
              className="text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, delay: 1 }}
            >
              Generating...
            </motion.span>
          </div>
        ) : (
          <div>
            {summary.split("").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ delay: index * 0.05 }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default ArticleCard;
