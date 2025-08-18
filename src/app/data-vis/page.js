"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function PakistanMap() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous render
    svg.selectAll("*").remove();

    const width = 600;
    const height = 500;

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("padding", "6px 10px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "6px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Load GeoJSON
    d3.json("/pk.json").then((geoData) => {
      const projection = d3.geoMercator().fitSize([width, height], geoData);
      const path = d3.geoPath().projection(projection);

      // Draw provinces
      svg
        .selectAll("path")
        .data(geoData.features)
        .join("path")
        .attr("d", path)
        .attr("fill", "#e0e0e0")
        .attr("stroke", "#333");

      // Example cities with climate data
    //   const cities = [
    //     {
    //       name: "Karachi",
    //       coords: [67.0099, 24.8615],
    //       climate: { avgTemp: "30°C", rainfall: "200mm", years: "2000–2020" },
    //     },
    //     {
    //       name: "Lahore",
    //       coords: [74.3587, 31.5204],
    //       climate: { avgTemp: "28°C", rainfall: "500mm", years: "2000–2020" },
    //     },
    //     {
    //       name: "Islamabad",
    //       coords: [73.0551, 33.6844],
    //       climate: { avgTemp: "26°C", rainfall: "1100mm", years: "2000–2020" },
    //     },
    //     {
    //       name: "Peshawar",
    //       coords: [71.5249, 34.0151],
    //       climate: { avgTemp: "27°C", rainfall: "400mm", years: "2000–2020" },
    //     },
    //     {
    //       name: "Quetta",
    //       coords: [66.975, 30.1798],
    //       climate: { avgTemp: "22°C", rainfall: "250mm", years: "2000–2020" },
    //     },
    //   ];

      const cities = [
            { name: "Gilgit", lat: 35.920834, lon: 74.308334 },
            { name: "Ahmedpur East", lat: 29.143644, lon: 71.257240 },
            { name: "Kāmoke", lat: 31.976515, lon: 74.222015 },
            { name: "Pir Mahal", lat: 30.767956, lon: 72.437813 },
            { name: "Jacobabad", lat: 28.281891, lon: 68.438171 },
            { name: "Sahiwal", lat: 30.677717, lon: 73.106812 },
            { name: "Zafarwal", lat: 32.337006, lon: 74.903336 },
            { name: "Khanewal", lat: 30.286415, lon: 71.932030 },
            { name: "Jaranwala", lat: 31.345394, lon: 73.429810 },
            { name: "New Mirpur City", lat: 33.148392, lon: 73.751770 },
            { name: "Multan", lat: 30.181459, lon: 71.492157 },
            { name: "Nawabshah", lat: 26.244221, lon: 68.410034 },
            { name: "Dera Ghāzi Khān", lat: 30.032486, lon: 70.640244 },
            { name: "Larkana", lat: 27.563993, lon: 68.215134 },
            { name: "Malakwāl", lat: 32.555496, lon: 73.194351 },
            { name: "Haveli Lakha", lat: 30.448601, lon: 73.697578 },
            { name: "Jalalpur Pirwala", lat: 29.505283, lon: 71.222084 },
            { name: "Nowshera", lat: 34.015858, lon: 71.975449 },
            { name: "Hafizabad", lat: 32.071697, lon: 73.685730 },
            { name: "Vehāri", lat: 30.045246, lon: 72.348869 },
            { name: "Okara", lat: 30.808500, lon: 73.459396 },
            { name: "Attock", lat: 33.768051, lon: 72.360703 },
            { name: "Abbottābad", lat: 34.168751, lon: 73.221497 },
            { name: "Qurtaba City", lat: 33.351357, lon: 72.774734 },
            { name: "Mandi Bahauddin", lat: 32.588169, lon: 73.497345 },
            { name: "Bahawalpur", lat: 29.395721, lon: 71.683334 },
            { name: "Karak", lat: 33.115269, lon: 71.095535 },
            { name: "Muzaffargarh", lat: 30.074377, lon: 71.184654 },
            { name: "Shikārpur", lat: 27.955648, lon: 68.637672 },
            { name: "Khairpur", lat: 27.529951, lon: 68.758141 },
            { name: "Kamoki", lat: 31.975508, lon: 74.223801 },
            { name: "Sargodha", lat: 32.082466, lon: 72.669128 },
            { name: "Pattoki", lat: 31.025009, lon: 73.847878 },
            { name: "Makli", lat: 24.743303, lon: 67.890938 },
            { name: "Garhi Habibullah", lat: 34.405262, lon: 73.380066 },
            { name: "Bhalwal", lat: 32.265396, lon: 72.905388 },
            { name: "Bannu", lat: 32.986111, lon: 70.604164 },
            { name: "Nankana Sahib", lat: 31.452097, lon: 73.708305 },
            { name: "Dijkot", lat: 31.217646, lon: 72.997368 },
            { name: "Sādiqābād", lat: 28.310350, lon: 70.127403 },
            { name: "Turbat", lat: 26.004168, lon: 63.060555 },
            { name: "Quetta", lat: 30.183270, lon: 66.996452 },
            { name: "Gujrat", lat: 32.571144, lon: 74.075005 },
            { name: "Bahawalpur (alt)", lat: 29.418068, lon: 71.670685 },
            { name: "Sukkur", lat: 27.713926, lon: 68.836899 },
            { name: "Khanqah Dogran", lat: 31.831667, lon: 73.623055 },
            { name: "Jhelum", lat: 32.940548, lon: 73.727631 },
            { name: "Qila Didar Singh", lat: 32.136673, lon: 74.012383 },
            { name: "Gujranwala", lat: 32.166351, lon: 74.195900 },
            { name: "Badin", lat: 24.655720, lon: 68.837242 },
            { name: "Sheikhupura", lat: 31.716661, lon: 73.985023 },
            { name: "Wah", lat: 33.783184, lon: 72.723076 },
            { name: "Taunsa", lat: 30.705557, lon: 70.657776 },
            { name: "Hub", lat: 25.067562, lon: 66.917038 },
            { name: "Narowal", lat: 32.099476, lon: 74.874733 },
            { name: "Chichawatni", lat: 30.535133, lon: 72.699539 },
            { name: "Muzaffarabad", lat: 34.359688, lon: 73.471054 },
            { name: "Shahdara", lat: 31.621113, lon: 74.282364 },
            { name: "Lahore", lat: 31.582045, lon: 74.329376 },
            { name: "Peshawar", lat: 34.025917, lon: 71.560135 },
            { name: "Thakot", lat: 34.788040, lon: 72.929115 },
            { name: "Saidu Sharif", lat: 34.749271, lon: 72.357063 },
            { name: "Sanghar", lat: 26.044418, lon: 68.953880 },
            { name: "Mardan", lat: 34.206123, lon: 72.029800 },
            { name: "Saddar Town", lat: 24.858480, lon: 67.001884 },
            { name: "Gwadar", lat: 25.126389, lon: 62.322498 },
            { name: "Pasrūr", lat: 32.265652, lon: 74.669525 },
            { name: "Mingora", lat: 34.773647, lon: 72.359901 },
            { name: "Kasur", lat: 31.118793, lon: 74.463272 },
            { name: "Faisalabad", lat: 31.418715, lon: 73.079109 },
            { name: "Thatta", lat: 24.749731, lon: 67.911636 },
            { name: "Chowk Azam", lat: 30.970655, lon: 71.212303 },
            { name: "Layyah", lat: 30.964750, lon: 70.939934 },
            { name: "Mīrpur Khās", lat: 25.529104, lon: 69.013573 },
            { name: "Rawalpindi", lat: 33.626057, lon: 73.071442 },
            { name: "Daska", lat: 32.338779, lon: 74.353065 },
            { name: "Bhakkar", lat: 31.633333, lon: 71.066666 },
            { name: "Ārifwāla", lat: 30.297859, lon: 73.058235 },
            { name: "Karachi", lat: 24.860966, lon: 66.990501 },
            { name: "Shahpur", lat: 32.286613, lon: 72.430252 },
            { name: "Kot Addu", lat: 30.466667, lon: 70.966667 },
            { name: "Jhang", lat: 31.278046, lon: 72.311760 },
            { name: "Jamshoro", lat: 25.416868, lon: 68.274307 },
            { name: "Islamabad", lat: 33.738045, lon: 73.084488 },
            { name: "Chunian", lat: 30.963774, lon: 73.977982 },
            { name: "Sialkot", lat: 32.497223, lon: 74.536110 },
            { name: "Dera Ismail Khan", lat: 31.831482, lon: 70.911598 },
            { name: "Dalbandin", lat: 28.883612, lon: 64.416061 },
            { name: "Chagai", lat: 29.297670, lon: 64.706734 },
            { name: "Khushāb", lat: 32.294445, lon: 72.349724 }
            ];


      // Draw city points
      svg
        .selectAll("circle")
        .data(cities)
        .join("circle")
        .attr("cx", (d) => projection([d.lon, d.lat])[0])
        .attr("cy", (d) => projection([d.lon, d.lat])[1])
        .attr("r", 2)
        .attr("fill", "red")
        .style("cursor", "pointer")
        .on("mouseover", (event, d) => {
            tooltip
            .style("opacity", 1)
            .html(
              `<b>${d.name}</b><br/>
               Avg Temp: 20 <br/>
               Rainfall: 200mm<br/>
               Years: 1900`
            );
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", event.pageX + 15 + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });

      // Add city labels
      svg
        .selectAll("text")
        .data(cities)
        .join("text")
        .attr("x", (d) => projection([d.lon, d.lat])[0] + 8)
        .attr("y", (d) => projection([d.lon, d.lat])[1] + 4)
        .text((d) => d.name)
        .style("font-size", "10px")
        .style("fill", "black");
    });

    return () => {
      d3.selectAll("div").remove(); // cleanup tooltip on unmount
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width={600}
      height={500}
      style={{ border: "1px solid #ccc" }}
    ></svg>
  );
}
