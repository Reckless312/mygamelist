import Form from "next/form";
import Image from "next/image";

const SearchBar = ({query} : {query ? : string}) => {
    return (
        <Form action="/search" scroll={false} className="search-form">
            <input name="query" defaultValue={query} placeholder="Search Games" className="search-input outline-none focus:ring-0 focus:outline-none"/>
            <div className="search-button">
                <button type="submit" className="cursor-pointer">
                    <Image src="/search.png" alt="search" width={20} height={20}></Image>
                </button>
            </div>
        </Form>
    )
}

export default SearchBar;