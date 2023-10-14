import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createJob } from "../../deprecateded/createJobAPI";
import { useUserStore } from "../../store/UserStore";


export function JobPreview() {

    const location = useLocation();
    const { state } = location;
    const { details, questions } = state;

    const navigate = useNavigate();

    const userId = useUserStore((state) => state.id);

    const onSubmit = (e:any) => {
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
            navigate
        );
    };

    return (
        <>
            <div style={{ position: 'absolute', width: '767px', height: '0px', left: '40px', top: '500px', border: '1px solid #DFDFDF', transform: 'rotate(90deg)', borderRight: '2px solid #000' }}></div>

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

            <div style={{ position: 'absolute', width: '138px', height: '36px', left: '548px', top: '154px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: 500, fontSize: '24px', lineHeight: '36px', color: '#000000', whiteSpace: 'nowrap' }}>
                Job Details
                <p>
                    Name: {details["name"]}
                </p>
            </div>

            <button onClick={onSubmit} type="submit"
                style={{ position: 'absolute', width: '231px', height: '50px', left: '548px', top: '686px', background: '#FF5353', borderRadius: '10px' }}>
                <p style={{ position: 'absolute', width: '231px', height: '50px', left: '0px', top: '13px', fontFamily: 'Urbanist', fontStyle: 'normal', fontWeight: 600, fontSize: '18px', lineHeight: '22px', color: '#FFFFFF' }}>
                    Add Listing
                </p>
            </button>
        </>
    );
}