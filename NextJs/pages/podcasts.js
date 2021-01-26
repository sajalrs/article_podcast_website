import React, { useContext } from "react";
import MediumCard from "../components/Cards/MediumCard/MediumCard.js";
import Page from "../components/Page/Page";
import styles from "../components/Page/Page.module.css";
import { AudioPlayerContext } from "../contexts/reducers/audioPlayerContext";
import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { ALL_PODCASTS_QUERY } from "../components/AudioPlayer/AudioPlayer";
import { Card } from "../components/Cards/Card";
const Podcasts = (props) => {
  const {
    loading,
    error,
    fetchMore,
    data,
    networkStatus,
  } = useQuery(ALL_PODCASTS_QUERY, { notifyOnNetworkStatusChange: true });

  const loadingMorePodcasts = networkStatus === NetworkStatus.fetchMore;

  let podcasts;
  if (loading && !loadingMorePodcasts) {
    podcasts = [
      {
        title: "False Nine Podcast #17 Champions League RO16 first leg review",
        by: "Ishan Sharma, Susajjan Dhungana and Ojash Dangal",
        link:
          "https://anchor.fm/s/333e122c/podcast/play/19475297/sponsor/a3205tm/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-09-12%2F9ca05751732f6a1351863756bdfb662b.m4a",
        date: "Sat, 12 Sep 2020 08:42:34 GMT",
        image:
          "https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_nologo/8497059/8497059-1599895849523-cbb8b2f53d641.jpg",
        description:
          "In this episode, Ishan, Ojash and Susajjan review the first leg ties of the Champions league Round of 16 first leg.\n\n",
      },
    ];
  } else {
    podcasts = data.podcasts;
  }

  const contents = podcasts.map((item, index) => (
    <div className={`${styles["main-pane-item"]}`}>
      <MediumCard
        image={item.image}
        date={item.date}
        title={item.title}
        text={item.description}
        contentType={Card.ContentType["audio-internal"]}
        index={index}
      />
    </div>
  ));
  return <Page sidebarFixTopOffset={0} mainPane={contents} />;
};

export default Podcasts;
