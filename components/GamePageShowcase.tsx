import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import {Images} from "@/components/GamesContext";

export default function GamePageShowcase({images}: {images: Images[]}) {
    return (
        <div className="w-full border border-gray-700 rounded-lg overflow-hidden shadow-xl">
            <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="pl-4 basis-full">
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image src={image.image_url} alt={`Game screenshots`} fill quality={100} priority={index === 0}
                                       className="object-contain hover:scale-105 transition-transform duration-300"/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-black/80 hover:bg-black"/>
                <CarouselNext className="right-2 bg-black/80 hover:bg-black"/>
            </Carousel>
        </div>
    )
}