import { Fragment, useEffect, useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { getCategories } from 'src/api/api'
import { CategoryProps } from './DashboardNav'
import { useUserCtaegory } from 'src/store/user-store'

interface Props {
  productCategory: string;
}

export default function CategoryDropdown(props: Props) {
  const [categories, setCategories] = useState<CategoryProps[]>([])
  const [selected, setSelected] = useState<CategoryProps>(categories[1])
  const {category, setCategory} = useUserCtaegory.getState();


  useEffect(()=>{
    getCategories(setCategories)
  }, [])

  useEffect(()=>{
    console.log("my category: ", category)
  }, [category])


  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Label className="block text-sm font-medium leading-6 text-gray-900">Select Category</Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected?.name ? selected.name : props.productCategory}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>

            <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {categories?.map((person: CategoryProps) => (
                  <ListboxOption
                    key={person.id}
                    className={({ focus }) =>
                      (
                        `${focus} ? 'bg-primaryColor text-white' : '',
                        ${!focus} ? 'text-primaryColor' : '',
                        'relative cursor-default select-none py-2 pl-3 pr-9'`
                )
                    }
                    value={person}
                  >
                    {({ selected, focus }) => (
                      <>
                        <span onClick={()=>{setCategory(person.name);}} className={`${selected} ? 'font-semibold' : 'font-normal', 'block truncate'`}>
                          {person.name}
                        </span>

                        {selected ? (
                          <span
                            className={
                              `${focus} ? 'text-white' : 'text-primaryColor',
                              'absolute inset-y-0 right-0 flex items-center pr-4'`
                            }
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
