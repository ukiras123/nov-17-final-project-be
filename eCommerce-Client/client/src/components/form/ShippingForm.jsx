("use client");
import React, { useEffect, useRef } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import Link from "next/link";

const ShippingForm = ({ setRef }) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    setRef = inputRef;
  }, []);

  //   inputField = [
  //     {
  //       name: "address", // eslint-disable-next-line
  //       type: "address", // eslint-disable-next-line
  //       label: "Address", // eslint-disable-next-line
  //       required: true, // eslint-disable-next-line
  //     },
  //   ];
  return (
    <div className='flex w-100 flex-col gap-4'>
      <div className='flex justify-center items-center gap-4 flex-col'>
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='address'
              value='address'
            />
          </div>
          <TextInput
            id='address'
            type='string'
            placeholder='56 lake cres, '
            required
            shadow
            ref={inputRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
