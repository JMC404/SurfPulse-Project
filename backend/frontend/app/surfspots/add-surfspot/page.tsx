import addSurfSpot from "@/app/components/addSurfspot";



export default async function addSurfspotPage() {



    return(
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-20">
    <form action={addSurfSpot} className="px-8 py-6">
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spot_name">
            Name
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="spot_name" type="text" placeholder="Enter the name" name="spot_name" required />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="break_type">
            Break Type
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="break_type" type="text" placeholder="Enter the break type" name="break_type" required />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Location use what3words
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="location" type="text" placeholder="judged.lodge.ultrasound. " name="location" required />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
            Thumbnail
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="thumbnail" type="text" placeholder="Enter the thumbnail URL" name="thumbnail" required />
        </div>
        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skill_level">
                             Skill Level
                        </label>
                        <select className="text-black text-lg rounded " name="skill_level" id="skill_level">
                        <option value="">Please Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                        </select>
                    </div>
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guide">
            Guide
        </label>
        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="guide" placeholder="Enter the guide" name="guide" required></textarea>
        </div>
        <div className="flex items-center justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Submit
        </button>
        </div>
    </form>
        </div>

    )
    
} 