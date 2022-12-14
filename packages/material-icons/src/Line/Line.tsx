import React, { FC } from "react";

import { SvgIcon, SvgIconProps } from "@mui/material";

const Line: FC<SvgIconProps> = (props) => (
  <SvgIcon viewBox="0 0 48 48" {...props}>
    <g style={{ transform: "scale(0.75)", transformOrigin: "center" }}>
      <path
        fill="#00b800"
        d="M9.82,0H38.18A9.85,9.85,0,0,1,48,9.82V38.18A9.85,9.85,0,0,1,38.18,48H9.82A9.85,9.85,0,0,1,0,38.18V9.82A9.85,9.85,0,0,1,9.82,0Z"
      />
      <path
        fill="#ffffff"
        d="M24,8C14.23,8,6.34,14.26,6.34,22.05c0,6.94,6.27,12.71,14.52,13.89h0l.59.07c2.8.59.37,4.1,1.29,4.82s9.07-4.53,13.94-9a15.07,15.07,0,0,0,1.92-1.91v0a3.28,3.28,0,0,0,.32-.4,12.06,12.06,0,0,0,2.63-7.42C41.56,14.26,33.68,8,24,8ZM18.21,25.63a.92.92,0,0,1-.92.92H13.74a.92.92,0,0,1-.92-.92V18.82a.92.92,0,0,1,.92-.92h.07a.92.92,0,0,1,.92.92v5.82h2.56a.92.92,0,0,1,.92.92Zm2.65,0a.92.92,0,0,1-.92.92h-.07a.92.92,0,0,1-.92-.92V18.82a.92.92,0,0,1,.92-.92h.07a.92.92,0,0,1,.92.92Zm8.32,0a.93.93,0,0,1-.27.65h0a.63.63,0,0,1-.22.16.92.92,0,0,1-.43.11h-.08a.77.77,0,0,1-.34-.07.78.78,0,0,1-.36-.26h0l-.07-.09-3.34-4.57v4.07a.92.92,0,0,1-.92.92h-.08a.92.92,0,0,1-.92-.92V18.82a.92.92,0,0,1,.92-.92h.08a.93.93,0,0,1,.8.47l3.32,4.45v-4a.92.92,0,0,1,.91-.92h.08a.92.92,0,0,1,.92.92Zm6.56-6.72a.92.92,0,0,1-.91.92H32.27v1.46h2.56a.91.91,0,0,1,.91.91v.08h0a.92.92,0,0,1-.91.92H32.27v1.45h2.56a.92.92,0,0,1,.91.92v.08a.92.92,0,0,1-.91.92H31.27a.92.92,0,0,1-.91-.92V18.84a.92.92,0,0,1,.91-.92h3.56a.92.92,0,0,1,.91.92Z"
      />
    </g>
  </SvgIcon>
);

export default Line;
