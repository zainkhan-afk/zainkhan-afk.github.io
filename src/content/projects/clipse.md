---
title: "Clipse — Cross-Device Clipboard"
date: "2026-07-24"
description: "A cross-device clipboard that keeps your text and images in sync across all of your devices."
github: "https://github.com/zainkhan-afk/Clipse"
link: "https://clipse-app.vercel.app"
display_graphic: "/projects/clipse-landing.png"
draft: false
tech: [Next.js, React, FastAPI, Python, Tailwind, PostgreSQL]
further_reading: true
---

Clipse keeps your text and images in sync across everything you own — copy on one device and paste on another with no cables and no fuss. Content is organized into named clipboards, like "work", "phone", or "scratch", each acting as a stream of text or image entries. Clipboards support an optional time-to-live, so temporary content such as one-time codes expires automatically.

The backend is built with FastAPI and SQLAlchemy, using JWT authentication stored in httpOnly cookies and Vercel Blob for image storage. The frontend is a Next.js (App Router) and React application styled with Tailwind CSS, featuring light/dark/system themes and a responsive, mobile-friendly layout. A live demo is available at [clipse-app.vercel.app](https://clipse-app.vercel.app).
