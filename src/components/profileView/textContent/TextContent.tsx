import { Box, Card, CardContent, Typography } from "@mui/material";

interface TextContentProps {
  label: string;
  content: string;
  height?: string | 'auto';
}

export const TextContent = ({ label, content, height }: TextContentProps) => {
  return (
    <div>
      <Box
        sx={{
          textAlign: "left",
          fontSize: "0.75rem",
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        {label}
      </Box>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#f3f3f3", width: "100%", padding: "10px", height }}
      >
          {content}
      </Card>
    </div>
  );
};
