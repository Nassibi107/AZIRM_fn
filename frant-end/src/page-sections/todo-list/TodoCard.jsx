import MoreHoriz from "@mui/icons-material/MoreHoriz";
import { Box, Card, Chip, Avatar, IconButton, AvatarGroup, LinearProgress } from "@mui/material";
import { Draggable } from "react-beautiful-dnd"; // CUSTOM COMPONENTS

import { FlexBetween, FlexBox } from "@/components/flexbox";
import { H6, Paragraph } from "@/components/typography";
const TodoCard = ({
  id,
  date,
  index,
  title,
  author,
  description,
  statusColor
}) => {
  return <Draggable key={id} draggableId={id} index={index}>
      {provided => {
      return <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} sx={{ ...provided.draggableProps.style,
        p: 2,
        mb: 3
      }}>
  

            <Box sx={{
          textAlign: "center",
          pt: 6,
          pb: 4
        }}>
              <H6 fontSize={18}>Activecode 1Y</H6>

              <Paragraph mt={0.5}>Package: 1 Year</Paragraph>
            </Box>

            <FlexBetween py={1}>
              <Paragraph fontWeight={600}> Template:</Paragraph>
            </FlexBetween>

            <LinearProgress value={32} variant="determinate" sx={{
          "& .MuiLinearProgress-bar": {
            backgroundColor: statusColor
          }
        }} />

            <FlexBetween pt="1.5rem">
              <FlexBox alignItems="center" gap={1}>
                <AvatarGroup max={3}>
                </AvatarGroup>
              </FlexBox>

              <Chip label="3 Weeks Left" color="secondary" />
            </FlexBetween>
          </Card>;
    }}
    </Draggable>;
};

export default TodoCard;