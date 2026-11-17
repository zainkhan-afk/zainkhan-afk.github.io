---
title: "Monocular 3D Position and Orientation from Coloured Markers"
company: "Freelance client"
workplace: "Freelance"
role: "Freelancer"
date: "2023-10"
description: "Estimating a rod's 3D position, roll and yaw from a single wide-angle camera using colour segmentation and known object size, with no depth sensor."
tech: [Python, OpenCV, NumPy, Computer Vision]
display_graphic: "/work/monocular-3d-pose-estimation/thumbnail.jpg"
featured: false
draft: false
---

## What it does

Estimates the 3D position and orientation of a hand-held rod from one wide-angle camera, with no depth sensor or stereo rig. The rod carries two coloured balls (green and blue). A red ball fixed in the scene is the spatial reference. The overlay shows the rod midpoint's X/Y/Z in centimetres and its roll and yaw in degrees.

## Demo

I ran the project on its recorded test video to produce this output.

<video src="/work/monocular-3d-pose-estimation/demo.mp4" poster="/work/monocular-3d-pose-estimation/thumbnail.jpg" controls preload="metadata" playsinline style="width:100%;border-radius:12px"></video>

## How it works

```mermaid
flowchart TD
  V[Wide-angle video frame] --> HSV[Convert BGR to HSV]
  T[HSV trackbar tuning tool] -.thresholds.-> MASK
  HSV --> MASK[Threshold each colour, erode]
  MASK --> CNT[Largest contour: centre and diameter in pixels]
  CNT --> AVG[10-frame moving average; lock the reference size]
  AVG --> DEPTH[Depth from known ball size and field of view]
  DEPTH --> REL[XYZ of each ball relative to the red reference]
  REL --> POSE[Rod midpoint XYZ, roll and yaw]
  POSE --> OVR[Overlay geometry and readouts]
```

1. **Segment by colour.** Each frame is converted to HSV and each ball is isolated with colour thresholds. I tuned the thresholds with a small OpenCV trackbar tool built for the project. One erosion removes speckle, and the largest contour gives each ball's centre and apparent diameter.
2. **Smooth.** A 10-frame moving average on position and diameter suppresses jitter. The reference ball is static, so its diameter is locked once it settles.
3. **Range from geometry, not learning.** The ball's known physical diameter divided by its diameter in pixels gives a centimetres-per-pixel scale. The camera's field of view turns the ball's pixel offset from the optical axis into a viewing angle. Range follows from the tangent relation, which for small angles is the pinhole model Z ≈ f·D/d.
4. **Relative pose.** Each ball's X/Y/Z is expressed relative to the reference ball. The rod's midpoint gives its position. The vector between the two balls gives yaw, and comparing the rod's known length with its projected length gives roll.
5. **Validate first.** Before moving to the wide-angle setup, I validated the size-based ranging on a calibrated, lens-undistorted camera, with a target at measured distances from 7 to 40 cm. I plotted computed range against ground truth.
