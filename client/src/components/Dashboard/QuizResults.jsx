import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import queryClient from "../../config/queryClient";

function QuizResults() {
	const quizResults = queryClient.getQueryData("quiz_results");
	if (quizResults.length === 0) {
		return <div>No quiz results found!</div>;
	}
	const { name } = quizResults[0].quiz;
	const results = quizResults.map((result) => {
		return {
			id: result.id,
			timeStarted: new Date(result.createdAt).toLocaleString("en-PH", {
				timeZone: "Asia/Manila",
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			}),
			score: `${result.score} / ${result.quiz.length}`,
			duration: `${Math.floor(
				(new Date(result.deletedAt).getTime() - new Date(result.createdAt).getTime()) / 1000
			)} out of ${result.time} seconds`,
		};
	});
	return (
		<div>
			<h1 className="text-3xl font-bold mt-5 mb-10">{name}</h1>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Time Started</TableCell>
							<TableCell align="left">Score</TableCell>
							<TableCell align="left">Duration</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{results.map((quiz) => (
							<TableRow key={quiz.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell align="left">{quiz.timeStarted}</TableCell>
								<TableCell align="left">{quiz.score}</TableCell>
								<TableCell align="left">{quiz.duration}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default QuizResults;
