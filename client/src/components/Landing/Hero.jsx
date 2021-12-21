import React from "react";
import HeroIcon from "../../images/Hero.svg";

function Hero() {
	return (
		<div className="relative bg-white overflow-hidden">
			<div className="max-w-7xl mx-auto">
				<div
					className="
                    relative
                    pb-8
                    bg-white
                    sm:pb-16
                    md:pb-20
                    lg:max-w-2xl lg:w-full lg:pb-28
                    xl:pb-32
                "
				>
					<main
						className="
                        mt-10
                        mx-auto
                        max-w-7xl
                        px-4
                        sm:mt-12 sm:px-6
                        md:mt-16
                        lg:mt-20 lg:px-8
                        xl:mt-28
                    "
					>
						<div className="sm:text-center lg:text-left">
							<h1 className="text-4xl font-roboto tracking-tight text-gray-900 sm:text-6xl">
								<span className="flex justify-center sm:justify-start xl:inline pr-3">
									Learn new concepts
								</span>
								<span className="flex justify-center sm:justify-start xl:inline">
									for each question
								</span>
							</h1>
							<p
								className="
                                mx-auto
                                mt-3
                                text-base text-gray-500
                                sm:mt-5 sm:text-lg sm:max-w-xl
                                md:mt-5 md:text-xl
                                lg:mx-0
                                text-center
                                sm:text-left sm:ml-0
                            "
							>
								We help you prepare for exams and quizzes
							</p>
							<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
								<div className="shadow-2xl">
									<a
										href="#"
										className="
                          w-full
                          flex
                          items-center
                          justify-center
                          px-8
                          py-3
                          border border-transparent
                          text-base
                          font-medium
                          text-white
                          color-linear
                          filled-button-linear
                          md:py-4 md:text-lg md:px-10
                                "
									>
										Start solving
									</a>
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
			<div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
				<img
					className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
					src={HeroIcon}
					alt=""
				/>
			</div>
		</div>
	);
}

export default Hero;
