/* eslint-disable react/prop-types */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useQuery } from "react-query";

import { getUserQuizzes } from "../../api/quizRecord";

const MultiActionAreaCard = ({ quizDetails }) => {
	const { quiz } = quizDetails;
	const { name, details, imageUrl } = quiz;
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia component="img" height="140" image={imageUrl} alt="green iguana" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{details}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Continue
				</Button>
			</CardActions>
		</Card>
	);
};

function ActiveQuizzes() {
	const { data, isLoading } = useQuery("user_quizzes", getUserQuizzes);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (data.length === 0) {
		return <div>No quizzes found</div>;
	}

	return (
		<div className="m-5 grid md:grid-cols-2 grid-cols-1 gap-5">
			{data.map((userQuiz) => {
				return <MultiActionAreaCard key={userQuiz.id} quizDetails={userQuiz} />;
			})}
		</div>
	);
}

ActiveQuizzes.defaultProps = {
	quizDetails: {},
};

export default ActiveQuizzes;
