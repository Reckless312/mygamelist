import Image from "next/image";

type Props = {
    spanContent: string;
    leftImage: string;
    centerImage: string;
    rightImage: string;
};

export default function HomePageContentBox({spanContent, leftImage, centerImage, rightImage,}: Props) {
    return (
        <div className="flex flex-col mt-6 px-4 sm:px-16 py-6">
            <span className="text-center md:text-start font-mono text-xl">{spanContent}</span>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex-1">
                    <Image src={leftImage} alt="Left Image" width={500} height={270} className=""/>
                </div>
                <div className="flex-1">
                    <Image src={centerImage} alt="Center Image" width={500} height={270} className=""/>
                </div>
                <div className="flex-1">
                    <Image src={rightImage} alt="Right Image" width={500} height={270} className=""/>
                </div>
            </div>
        </div>
    );
}
