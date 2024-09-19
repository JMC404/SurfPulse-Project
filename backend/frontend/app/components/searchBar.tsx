'use client'


import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Popover } from '@headlessui/react';


export default function SearchBar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkillLevel, setSelectedSkillLevel] = useState('');
    

    const handleSearchChange = (event : any) => {
        setSearchQuery(event.target.value);
        
        
    };

    const handleSkillLevelChange = (event : any) => {
        const skillLevel = event.target.value;
        setSelectedSkillLevel(skillLevel);
    };

    const search = async () => {
    
        router.push(`/search?name=${searchQuery}&skill_level=${selectedSkillLevel}`)

    }


    return (
        <div className="flex items-center">
            <input
                className="text-center border border-gray-300 rounded-md px-3 py-2 mr-2"
                type="text"
                id="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search surf spots"
            />
            <Popover className="relative">
                <Popover.Button className="text-gray-600 hover:text-gray-900 focus:outline-none">
                    <ChevronDownIcon className='w-5 h-5'/>
                </Popover.Button>
                <Popover.Panel className="absolute z-10 w-48 bg-white shadow-md rounded-md py-2">
                    <div className='px-4'>
                        <h1 className='text-sm font-medium text-gray-900'>Filter by your skill level</h1>
                        <div className='mt-2'>
                            <label htmlFor='skill_level0' className='flex items-center cursor-pointer'>
                                <input
                                    type='radio'
                                    id='skill_level0'
                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    value=""
                                    checked={selectedSkillLevel === ""}
                                    onChange={handleSkillLevelChange}
                                />
                                <span className='ml-2 text-sm text-gray-700'>All skill levels</span>
                            </label>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor='skill_level1' className='flex items-center cursor-pointer'>
                                <input
                                    type='radio'
                                    id='skill_level1'
                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    value="beginner"
                                    checked={selectedSkillLevel === "beginner"}
                                    onChange={handleSkillLevelChange}
                                />
                                <span className='ml-2 text-sm text-gray-700'>Beginner</span>
                            </label>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor='skill_level2' className='flex items-center cursor-pointer'>
                                <input
                                    type='radio'
                                    id='skill_level2'
                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    value="intermediate"
                                    checked={selectedSkillLevel === "intermediate"}
                                    onChange={handleSkillLevelChange}
                                />
                                <span className='ml-2 text-sm text-gray-700'>Intermidiate</span>
                            </label>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor='skill_level3' className='flex items-center cursor-pointer'>
                                <input
                                    type='radio'
                                    id='skill_level3'
                                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                    value="expert"
                                    checked={selectedSkillLevel === "expert"}
                                    onChange={handleSkillLevelChange}
                                />
                                <span className='ml-2 text-sm text-gray-700'>Expert</span>
                            </label>
                        </div>
                    </div>
                </Popover.Panel>
            </Popover>
            <button onClick={search} className="flex items-center p-2 rounded-full hover:bg-blue-700">
                <MagnifyingGlassCircleIcon className='w-8 h-auto' />
            </button>
        </div>
    );
}
