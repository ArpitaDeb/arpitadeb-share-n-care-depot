const fs = require('fs');
const crypto = require('crypto');
const { router, readVideosData, upload } = require('../middleware/videoMiddleware');

const updateVideosData = (postedVideo) => {
    const videos = readVideosData();
    const newVideoData = [...videos, postedVideo];
    fs.writeFileSync("./data/videos.json", JSON.stringify(newVideoData));
}

const replaceImagePath = (imagePath) => {
    return imagePath.replace(/\\/g, '/').replace("public", "");
}
const createPostedVideo = (title, description, imagePath) => {
    const newVideoId = crypto.randomUUID();
    return {
        id: newVideoId,
        title,
        description,
        channel: "Sports News",
        image: replaceImagePath(imagePath),
        views: "0",
        likes: "0",
        duration: "0:00",
        video: "",
        timestamp: Date.now(),
        comments: [],
    };
}

const addCommentToVideo = (video, comment) => {
    const newCommentId = crypto.randomUUID();
    const postedComment = {
        id: newCommentId,
        name: "Arpita Deb",
        comment,
        likes: "1",
        timestamp: Date.now()
    };
    video.comments.push(postedComment);
}

router.get("/", (_req, res) => {
    try {
        const videos = readVideosData();
        const videoData = videos.map((video) => {
            return {
                id: video.id,
                title: video.title,
                image: video.image,
                channel: video.channel,
            }
        })
        res.status(200).json(videoData);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:id", (req, res) => {
    try {
        const videos = readVideosData();
        const videoId = req.params.id;
        const video = videos.find((vid) => vid.id === videoId);
        if (video) {
            res.status(200).json(video);
        } else {
            res.status(404).json({ error: "Video not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/", upload.single("image"), (req, res) => {
    const { title, description } = req.body;
    const imagePath = req.file.path;

    if (!title || !description || !imagePath) {
        return res.status(400).json({ error: "Please provide title, description, and image" });
    }
    const postedVideo = createPostedVideo(title, description, imagePath);
    updateVideosData(postedVideo);

    return res.status(201).send("Videos updated");
});

router.post("/:id/comments", (req, res) => {
    const { comment } = req.body;
    if (!comment) {
        return res.status(400).json({ error: "Please provide a comment" });
    }

    const videosData = readVideosData();
    const videoId = req.params.id;
    const commentedVideo = videosData.find((vid) => vid.id === videoId);

    if (!commentedVideo) {
        return res.status(404).json({ error: "Video not found" });
    }
    addCommentToVideo(commentedVideo, comment);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
    return res.status(201).send("Comment posted Successfully");
});

router.delete("/:videoId/comments/:commentId", (req, res) => {
    const videosData = readVideosData();
    const videoId = req.params.videoId;
    const commentVideo = videosData.find((vid) => vid.id === videoId);
    if (!commentVideo) {
        return res.status(404).json({ error: "Video not found" });
    } else {
        const commentId = req.params.commentId;
        const newCommentArray = commentVideo.comments.filter((com) => com.id !== commentId);
        commentVideo.comments = newCommentArray;
        fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
        return res.status(200).send("Comment deleted Successfully");
    }
});

router.put("/:videoId/likes", (req, res) => {
    const videosData = readVideosData();
    const videoId = req.params.videoId;
    const likedVideo = videosData.find((vid) => vid.id === videoId);
    if (!likedVideo) {
        return res.status(404).json({ error: "Video not found" });
    } else {
        let newLikes = parseInt(likedVideo.likes.replace(/,/g, ""), 10) + 1;
        likedVideo.likes = newLikes.toLocaleString();
        fs.writeFileSync("./data/videos.json", JSON.stringify(videosData));
        return res.status(200).send("Like added Successfully");
    }
});
router.use((err, _req, res) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = router;
