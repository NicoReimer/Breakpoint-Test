import { Card, CardMedia, CardContent, Typography, Stack, CardActionArea } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function WikiCard({ id, title, image, views }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollWidth > textRef.current.clientWidth;
      setShouldAnimate(isOverflowing);
    }
  }, [title]);

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        maxWidth: 280,
      }}
    >
      <CardActionArea 
        component={Link} 
        to={`/wiki/${id}`}
        sx={{
          "&:hover .scrolling-text": {
            animation: shouldAnimate ? "marquee 8s linear infinite" : "none",
          }
        }}
      >
        <CardMedia
          sx={{ height: 90 }}
          image={image}
          title={title}
        />
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: -1 }}
          >
            <Typography 
              ref={textRef}
              variant="h5" 
              component="div"
              sx={{
                maxWidth: "70%",
                position: "relative",
                overflow: "hidden",
                "& .scrolling-text": {
                  whiteSpace: "nowrap",
                  display: "inline-block",
                  paddingRight: "50px"
                },
                "@keyframes marquee": {
                  "0%": {
                    transform: "translateX(0)"
                  },
                  "95%": {
                    transform: "translateX(-100%)",
                    visibility: "visible"
                  },
                  "95.1%": {
                    visibility: "hidden"
                  },
                  "99.99%": {
                    visibility: "hidden",
                    transform: "translateX(100%)"
                  },
                  "100%": {
                    visibility: "visible",
                    transform: "translateX(0)"
                  }
                }
              }}
            >
              <span className="scrolling-text">
                {title}
              </span>
            </Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <VisibilityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {views}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
