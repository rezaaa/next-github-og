import { ImageResponse } from "next/server";

export const size = {
  width: 1200,
  height: 630,
};

export const runtime = "edge";

// Font
const interBold = fetch(
  new URL("../../../../public/fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interMedium = fetch(
  new URL("../../../../public/fonts/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const interLight = fetch(
  new URL("../../../../public/fonts/Inter-Light.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;
  const githubData = await fetch(
    `https://api.github.com/users/${username}`
  ).then((res) => res.json());
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 120,
          lineHeight: 1.6,
          flexDirection: "column",
          gap: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              paddingRight: 100,
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 200, color: "#6C7682" }}>
              @{githubData.login}
            </span>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: "#24292E",
                margin: 0,
                marginTop: 5,
              }}
            >
              {githubData.name}
            </h1>
            <p
              style={{
                fontSize: 26,
                fontWeight: 100,
                color: "#6C7682",
                marginTop: 15,
              }}
            >
              {githubData.bio}
            </p>
          </div>
          <img
            src={githubData.avatar_url}
            style={{ width: 160, height: 160, borderRadius: "100%" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
            }}
          >
            <span style={{ fontWeight: 800 }}>{githubData.followers}</span>
            <span style={{ fontWeight: 100, color: "#6C7682" }}>Followers</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
            }}
          >
            <span style={{ fontWeight: 800 }}>{githubData.following}</span>
            <span style={{ fontWeight: 100, color: "#6C7682" }}>Following</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
            }}
          >
            <span style={{ fontWeight: 800 }}>{githubData.public_repos}</span>
            <span style={{ fontWeight: 100, color: "#6C7682" }}>
              Public Repos
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
            }}
          >
            <span style={{ fontWeight: 800 }}>{githubData.public_gists}</span>
            <span style={{ fontWeight: 100, color: "#6C7682" }}>
              Public Gists
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interBold,
          style: "normal",
          weight: 600,
        },
        {
          name: "Inter",
          data: await interMedium,
          style: "normal",
          weight: 200,
        },
        {
          name: "Inter",
          data: await interLight,
          style: "normal",
          weight: 100,
        },
      ],
    }
  );
}
