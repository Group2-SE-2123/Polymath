import React from "react";
// import axios from "axios";
// import { useQuery } from "react-query";

import AlgbebraImg from "../../images/img/algebra.jpg";

import "./style.scss";

function QuizDetails() {
	return (
		<>
			<div className="mx-7 mt-4">
				<h3 className="dashboard-text font-semibold text-2xl mb-3">Algebra Quiz</h3>
				<div className="dashboard-text font-normal text-base">Read the following instructions</div>

				<div className="flex flex-col md:flex-row my-3">
					<div className="w-1/3">
						<img className="h-40 w-60 mx-none rounded-3xl" src={AlgbebraImg} alt="" />
					</div>
					<div className="w-2/3">
						<table className="table-auto ml-1 w-full">
							<tbody>
								<tr>
									<td>The Sliding</td>
									<td>Malcolm Lockyer</td>
								</tr>
								<tr>
									<td>Witchy Woman</td>
									<td>The Eagles</td>
								</tr>
								<tr>
									<td>Shining Star</td>
									<td>Earth, Wind, and Fire</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default QuizDetails;
