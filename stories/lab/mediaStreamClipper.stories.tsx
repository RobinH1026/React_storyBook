/* eslint-disable storybook/context-in-play-function */
import React, { FC, useState, useCallback, useRef } from "react";
import { Meta } from "@storybook/react";

import MediaStreamClipper, {
  useGetVideoSnapshot,
} from "@eGroupAI/material-lab/MediaStreamClipper";
import { Grid, Typography, Button } from "@mui/material";

export default {
  title: "Lab/MediaStreamClipper",
  component: MediaStreamClipper,
  argTypes: {
    pauseOnTimeout: { control: "number", defaultValue: 20000 },
    mirrored: { control: "boolean", defaultValue: true },
    isStop: { control: "boolean", defaultValue: false },
    isStopSnapshot: { control: "boolean", defaultValue: false },
    isPause: { control: "boolean", defaultValue: false },
    intervalTime: { control: "number", defaultValue: 100 },
    facingMode: {
      control: {
        type: "inline-radio",
        options: ["user", "environment"],
      },
      defaultValue: "user",
    },
  },
} as Meta;

export const Default: FC = (args) => {
  const [countTimeout, setCountTimeout] = useState(0);
  const [blob, setBlob] = useState<string>();

  const handleGetIntervalShot = (
    blob: Blob,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D | null
  ) => {
    setBlob(URL.createObjectURL(blob));
    // Can get imageData by canvas and ctx
    // ctx.getImageData(0, 0, canvas.width, canvas.height).data
  };

  const handleUserMediaFulfilled = useCallback((video) => {
    // eslint-disable-next-line no-param-reassign
    video.onloadedmetadata = function () {
      // eslint-disable-next-line storybook/await-interactions
      video.play();
    };
  }, []);
  const handleUserMediaRejected = useCallback((reason) => {
    console.log(reason);
  }, []);
  const handleGetUserMediaError = useCallback((error) => {
    console.log(error);
  }, []);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h6">Streaming</Typography>
        <MediaStreamClipper
          handleGetIntervalShot={handleGetIntervalShot}
          muted
          onTimeout={() => {
            setCountTimeout((v) => v + 1);
          }}
          controls
          autoPlay
          /** Auto play on mobile device */
          playsInline
          onGetUserMediaFulfilled={handleUserMediaFulfilled}
          onGetUserMediaRejected={handleUserMediaRejected}
          onGetUserMediaError={handleGetUserMediaError}
          {...args}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h6">Snapshots</Typography>
        <img src={blob} alt="" />
      </Grid>
      <Grid item xs={12}>
        count timeout: {countTimeout}
      </Grid>
    </Grid>
  );
};

export const UseGetVideoSnapshot: FC = () => {
  const videoEl = useRef(null);
  const [getVideoSnapshot] = useGetVideoSnapshot(videoEl);
  const [blob, setBlob] = useState<string>();

  const handleClick = async () => {
    const result = await getVideoSnapshot("image/jpeg", 0.8);
    if (result && result.blob) {
      setBlob(URL.createObjectURL(result.blob));
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Video</Typography>
        <video ref={videoEl} src="/video.mp4" autoPlay controls />
        <br />
        <Button variant="contained" onClick={handleClick}>
          Snapshot
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Snapshots</Typography>
        <img src={blob} alt="" />
      </Grid>
    </Grid>
  );
};
