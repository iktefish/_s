import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    icon: {
        marginRight: "20px",
    },
    button: {
        marginTop: "40px",
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardGrid: {
        paddingTop: "20px",
    },
    cardMedia: {
        paddingTop: "56.25%", //~> This is not a Magic Number. This gives us an aspect ration of 16:9.
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: "50px 0",
    },
}));

export default useStyles;
