// --- Material Ui Imports --- //


import {Card, CardActionArea, CardMedia} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {withStyles} from "@mui/styles";

export const FiCard = withStyles({
    root: {
        position: "relative"
    }
})(Card);

export const FiCardActionArea = withStyles({
    root: {
        position: "relative"
    }
})(CardActionArea);

export const FiCardActions = withStyles({
    root: {
        position: "relative"
    }
})(CardActions);

export const FiCardContent = withStyles({
    root: {
        position: "relative",
        backgroundColor: "transparent"
    }
})(CardContent);

export const FiCardMedia = withStyles({
    root: {
        position: "absolute",
        top: 0,
        right: 0,
        height: "100%",
        width: "100%"
    }
})(CardMedia);

// --- Exports --- //
export default {
    FiCard,
    FiCardActionArea,
    FiCardActions,
    FiCardContent,
    FiCardMedia
};
