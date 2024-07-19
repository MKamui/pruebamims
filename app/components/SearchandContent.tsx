"use client"
import { useState } from "react";
import { addSearchedWord } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearchSharp } from "react-icons/io5";
import { IoIosPlay } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import axios from 'axios';
import Swal from 'sweetalert2'

interface Word {
  title: string;
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  meanings: {
    partOfSpeech: string;
    synonyms: string;
    definitions: {
      definition: string;
      example: string;
    }[];
  }[];
  sourceUrls: string;
}

interface State {
  word: Word | null;
  searchInput: string;
}

const SearchandContent: React.FC = () => {

  const dispatch = useDispatch();
  const [state, setState] = useState<State>({
    word: null,
    searchInput: '',
  });

  const handleSearch = async (searchInput: string) => {
    if (searchInput === ""){
      Swal.fire({
        text: "Please type a word",
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
    }
    else {
      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`);
        const word: Word = response.data[0];
        setState({...state, word });
        dispatch(addSearchedWord(word.word));
      } catch (error) {
        console.error(error);
        Swal.fire({
          text: "The word was not found, please try another",
          icon: "error",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({...state, searchInput: event.target.value });
  };

  const searchedWords = useSelector((state: any) => state.searchedWords);

  return (
    <section className="py-10">
      <div className="flex w-full rounded-xl bg-gray-100 dark:bg-gray-800">
        <input
          type="search"
          placeholder="Enter word..."
          className="w-full px-4 py-4 font-bold focus:outline-none bg-gray-100 dark:bg-gray-800 rounded-l-xl text-lg lg:text-xl focus:ring focus:ring-violet-500"
          onChange={handleInputChange}
          value={state.searchInput}
        />
        <button className="text-violet-500 font-bold py-2 px-4 hover:scale-110" onClick={() => handleSearch(state.searchInput)}>
          <IoSearchSharp className="text-lg lg:text-xl font-bold"/>
        </button>
      </div>
      {searchedWords.length > 0 ?
        <div className="flex items-center space-x-2 w-full text-sm md:text-base">
          <h3 className="text-gray-400">Previous searches:</h3>
          <ul className="flex items-center space-x-2 flex-wrap">
            {searchedWords.map((word: any, index: number) => (
              <li key={index}>{word.word} {word.timestamp}</li>
            ))}
          </ul>
        </div> : null}
      {state.word && (
        <div className="pt-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold">{state.word.word}</h2>
              <h3 className="text-lg md:text-xl lg:text-2xl text-purple-600 pt-2">{state.word.phonetic}</h3>
            </div>
            {state.word.phonetics.find(phonetic => phonetic.audio !== "")?.audio ? 
            <a href={state.word.phonetics.find(phonetic => phonetic.audio !== "")?.audio} target="_blank">
              <div className="w-[60px] md:w-[70px] bg-purple-200 aspect-square rounded-full flex items-center justify-center hover:scale-105">
                <IoIosPlay className="text-3xl md:text-4xl text-purple-600"/>
              </div>
            </a>: null}
          </div>
          {state.word.meanings.map((meaning, index) => (
            <div key={index} className="pt-10">
              <div className="w-full flex items-center space-x-4">
                <h4 className="font-bold italic text-lg md:text-xl lg:text-2xl">{meaning.partOfSpeech}</h4>
                <div className="w-full h-1 bg-gray-100"/>
              </div>
              <h4 className="pt-10 pb-4 text-gray-400 md:text-lg lg:text-xl">Meaning</h4>
              {meaning.definitions.map((definition, index) => (
                <div key={index}>
                  <ul className="list-disc pt-2 pl-10 marker:text-purple-600">
                    <li className="text-sm md:text-base lg:text-lg">{definition.definition}</li>
                  </ul>
                  {definition.example ? <p className="text-sm md:text-base lg:text-lg pl-10 text-gray-400">"{definition.example}"</p> : null}
                </div>
              ))}
              {meaning.synonyms.length > 0 ? 
              <div className="flex items-center space-x-6 pt-10 md:text-lg lg:text-xl">
                <h4 className="text-gray-400">Synonym</h4>
                <h4 className="text-purple-600 font-semibold">{meaning.synonyms[0]}</h4>
              </div> : null}
            </div>
          ))}
          <div className="w-full h-1 bg-gray-100 mt-10"/>
          <div className="pt-4 flex items-center space-x-6 text-sm md:text-base">
            <h4 className="text-gray-400">Source</h4>
            <div className="flex items-center space-x-2">
              <a href={state.word.sourceUrls[0]} target="_blank" className="text-gray-600 hover:underline visited:text-purple-600">{state.word.sourceUrls}</a>
              <FaExternalLinkAlt className="text-gray-400 text-xs md:text-sm"/>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SearchandContent;