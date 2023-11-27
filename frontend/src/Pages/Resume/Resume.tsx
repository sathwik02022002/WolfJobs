import ResumeDropzone from "./ResumeDropZone";

const Resume = () => {
    return (
        // Outer container that fills the height of the screen and centers its child
        <div className="flex items-center justify-center h-screen">
            <div className="w-1/3">
                <ResumeDropzone />
            </div>
        </div>
    );
};

export default Resume;
