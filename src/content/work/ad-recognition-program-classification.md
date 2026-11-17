---
title: "Ad Recognition & Program Classification"
company: "National Center for Artificial Intelligence"
role: "Research Associate"
date: "2022-06"
description: "Ad recognition and program classification using multimodal ML models."
tech: [Multimodal ML]
featured: false
draft: false
---

## What I built

Ad recognition built on live TV channels, frames would be sampled from the live stream and then they would be passed through a convolutional neural netowrk (CNN). The embedding from the CNN would be used to compare the frame with a database of ad frame embeddings. The cosine distance between the sampled frame embedding was calculated with all the frames in the DB and the closest match would be selected. This is how ads were detected. 

This was consolidated with a YOLO model trained on logo detection that would detect the logo of the company within the ad. This would detect the ad currently being streamed, the timing of the ad would be detected using a scene detection algorithm. 

The models were deployed using onnx on GPUs with multiple instances, frame batches were constructed and passed to the models for inference to ensure that multiple frames were executed in parallel.

The setup ran on 3 channels concurrently.