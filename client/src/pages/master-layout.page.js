import "./layout.css";

import { Headers } from "./partials/header";
import { NowShowing } from "./home/home.component";

export function Layout() {
    return (<>
        <div className="d-flex h-100 text-center text-white bd-red">
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
                <Headers></Headers>

                <main className="px-3 py-5">
                    <NowShowing></NowShowing>
                </main>


            </div>

        </div>
    </>);
}