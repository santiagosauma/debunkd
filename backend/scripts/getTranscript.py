def getTrans(link):
    from youtube_transcript_api import YouTubeTranscriptApi
    video_id = link.split("v=")[1]
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    answer = ""

    for i in range(len(transcript)):
        answer += transcript[i]['text'] + ' '
    return answer


if __name__ == "__main__":
    print(getTrans("https://www.youtube.com/watch?v=KOdfpbnWLVo"))
