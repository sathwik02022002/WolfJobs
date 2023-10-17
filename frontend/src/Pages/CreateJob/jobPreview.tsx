import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createJob } from "../../deprecateded/createJobAPI";
import { useUserStore } from "../../store/UserStore";
import { Button } from "@mui/material";



export function JobPreview() {

    const location = useLocation();
    const { state } = location;
    const { details, questions } = state;

    const navigate = useNavigate();

    const userId = useUserStore((state) => state.id);
    const managerAffiliation = useUserStore((state) => state.affiliation);


    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log("form submitted");
        createJob(
            details["name"],
            userId,
            "open",
            details["location"],
            details["description"],
            details["pay"],
            details["type"],
            questions["question1"],
            questions["question2"],
            questions["question3"],
            questions["question4"],
            managerAffiliation,
            navigate
        );
    };

    return (
        <>
            <div className="content bg-slate-50">
                <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
                    <>
                        <div className="w-4/12 bg-white/60 overflow-y-scroll overflow-x-hidden pt-2 px-9">
                            <div className="text-2xl py-4">

                                <div style={{ position: 'absolute', width: '276px', height: '36px', left: '48px', top: '154px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 500, fontSize: '24px', lineHeight: '36px', color: '#000000' }}>
                                    Create New Job Listing
                                </div>

                                <p style={{ position: 'absolute', height: '20px', left: '3.33%', right: '95.28%', top: '54%', transform: 'translateY(-50%)', marginTop: '-135.5px', background: 'white' }}>
                                    <img src="/images/Vector.png" alt="Vector Image" />
                                </p >
                                <div style={{ position: 'absolute', width: '81px', height: '19px', left: '80px', top: '232px', fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '19px', color: '#1E1E1E' }}>
                                    Add Details
                                </div>

                                <p style={{ position: 'absolute', height: '20px', left: '3.33%', right: '95.28%', top: '60%', transform: 'translateY(-50%)', marginTop: '-135.5px', background: 'white' }}>
                                    <img src="/images/Vector.png" alt="Vector Image" />
                                </p>
                                <div style={{ position: 'absolute', width: '109px', height: '19px', left: '80px', top: '272px', fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '19px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>
                                    Fill Questionnaire
                                </div>


                                <p style={{ position: 'absolute', height: '20px', left: '3.33%', right: '95.28%', top: '65.5%', transform: 'translateY(-50%)', marginTop: '-135.5px', background: 'white' }}>
                                    <img src="/images/Vector.png" alt="Vector Image" />
                                </p>
                                <div style={{ position: 'absolute', width: '109px', height: '19px', left: '80px', top: '312px', fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '19px', color: '#1E1E1E', whiteSpace: 'nowrap' }}>
                                    Preview
                                </div>


                                <p style={{ position: 'absolute', height: '20px', left: '3.33%', right: '95.28%', top: '71.5%', transform: 'translateY(-50%)', marginTop: '-135.5px', background: 'white' }}>
                                    <img src="/images/Vector2.png" alt="Vector Image" />
                                </p>
                                <div style={{ position: 'absolute', width: '109px', height: '19px', left: '80px', top: '352px', fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: 400, fontSize: '16px', lineHeight: '19px', color: '#CBCBCB', whiteSpace: 'nowrap' }}>
                                    Confirm
                                </div>

                            </div>
                        </div>
                    </>
                    <>
                        <div className="w-7/12">
                            <div className="flex flex-col m-4 ">
                                <div className="text-xl border-b border-gray-300 font-bold">
                                    Job Details
                                </div>
                                <div className="flex flex-row justify-between m-2">
                                    <div className="flex flex-col ">
                                        <div>
                                            <span className="font-semibold text-lg">Role:</span>&nbsp;
                                            {details["name"]}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-lg">Job Status:</span>
                                            &nbsp;
                                            <span
                                                className={`capitalize ${"text-green-500"}`}
                                            >
                                                open
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-lg capitalize">Type:</span>
                                            &nbsp;
                                            {details["type"]}
                                        </div>
                                        <div>
                                            <span className="font-semibold text-lg">Location:</span>&nbsp;
                                            {details["location"]}
                                        </div>
                                    </div>
                                    <div className="text-3xl p-4">{details["pay"]}$/hr</div>
                                </div>
                                <div className="h-6" />
                                <div className="text-lg border-b border-gray-300 mb-2 font-bold">
                                    Description
                                </div>
                                <div className="text-[#686868] mx-2">{details["description"]}</div>
                                <div className="h-6" />
                                <div className="text-lg border-b border-gray-300 mb-2 font-bold">
                                    Questions
                                </div>
                                <div className="text-[#686868] mx-2">1: {questions["question1"]}</div>
                                <div className="text-[#686868] mx-2">2: {questions["question2"]}</div>
                                <div className="text-[#686868] mx-2">3: {questions["question3"]}</div>
                                <div className="text-[#686868] mx-2">4: {questions["question4"]}</div>

                            </div>
                            <Button onClick={onSubmit} type="submit"
                                variant="contained"
                                color="primary"
                                style={{
                                    background: "#FF5353",
                                    borderRadius: "10px",
                                    textTransform: "none",
                                    fontSize: "16px",
                                }}>
                                Add Listing
                            </Button>

                        </div>

                    </>
                </div>
            </div >


        </>
    );
}