import React from "react";
import { useState } from "react";
import styled from "styled-components";
import AddressInput from "./AddressInput";
import CreateEvent from "./CreateEvent";

const InputField = () => {
  const address = AddressInput("");
  const [lat , setLat] = useState("");
  const [long , setLong] = useState("");
  const [coordonne , setCoordonne] = useState();

  // const handleInputChange=(e) => {
  //   e.persist()
  //   setCoordonne(e.target.value);
  // };
  

  return (
    <Wrapper>
      <Input
        name="center"
        placeholder="Address"
        {...address}
        isTyping={address.value !== ""}
        value={coordonne}
        // onChange={handleInputChange}
      />
      {address.suggestions?.length > 0 && (
        <SuggestionWrapper>
          {address.suggestions.map((suggestion, index) => {
            return (
              <Suggestion
                latitude={address}
                key={index}
                lat= {suggestion.center[0]}
                long= {suggestion.center[1]}
                onClick={() => {
                  console.log(suggestion);
                  setLat(suggestion.center[0]);
                  setLong(suggestion.center[1]);
                  address.setValue(suggestion.center);
                  address.setSuggestions([]);
                  // setCoordonne(suggestion.center);
                  // CreateEvent(coordonne);
                  // console.log(coordonne);
                  
                }}
              >
                
                {suggestion.place_name}
              </Suggestion>
            );
          })}
        </SuggestionWrapper>
      )}
    </Wrapper>
  );
};

export default InputField;

const Wrapper = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0 auto;
`;

const Input = styled.input`
  font-family: Helvetica;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;

  align-items: center;
  width: 100%;
  position: relative;
  border-radius: 4px;
  border: 1px solid gray;

  display: inline-flex;
  height: 50px;

  position: relative;
  justify-self: center;
  &:focus {
    outline: none;
    border: 2px solid blue;
    border-radius: ${(props) => props.isTyping && "3px 3px 3px 3px"};
  }
`;

const SuggestionWrapper = styled.div`
  background: white;
  position: absolute;
  width: auto;
  padding: 10px 20px;
  z-index: 10000;
  border-radius: 0px 0px 10px 10px;
`;

const Suggestion = styled.p`
  cursor: pointer;
  max-width: 400px;
`;
