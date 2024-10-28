import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ overflow: "hidden", display: "flex", alignItems: "center", minHeight: "100vh", padding: "0 5%" }}>
      {/* Left Section with Text and Buttons */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "40px",
            lineHeight: "48px",
            color: "#000000",
            marginBottom: "20px",
          }}
        >
          We understand that being a student can be{" "}
          <span style={{ color: "#a80502" }}>challenging.</span>
        </div>

        <div
          style={{
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "20px",
            lineHeight: "24px",
            color: "#14043b",
            marginBottom: "40px",
          }}
        >
          Join our dynamic team right here on campus. Earn, learn, and be part
          of the community that powers your daily essentials. Apply now and
          shape your campus experience!
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
            type="button"
            style={{
              width: "150px",
              height: "54px",
              background: "#a80502",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                fontFamily: "Urbanist",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                color: "white",
                margin: 0,
              }}
            >
              Sign Up
            </p>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            type="button"
            style={{
              width: "150px",
              height: "54px",
              background: "#FFFFFF",
              border: "1px solid #656565",
              borderRadius: "10px",
            }}
          >
            <p
              style={{
                fontFamily: "Urbanist",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "24px",
                margin: 0,
                color: "#a80502",
              }}
            >
              Login
            </p>
          </button>
        </div>
      </div>

      {/* Right Section with Image */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "50px" }}>
        <img
          src="/images/landingpage_image2.png"
          alt="Landing Page Image"
          style={{ width: "100%", maxWidth: "600px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default LandingPage;
