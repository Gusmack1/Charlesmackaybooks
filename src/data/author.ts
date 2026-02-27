import { SITE_CONSTANTS } from '@/config/constants';

export const authorData = {
  name: "Charles E. MacKay",
  fullName: "Charles Edward MacKay",
  title: "Aviation Historian & Author",
  email: SITE_CONSTANTS.AUTHOR_EMAIL,
  location: "Glasgow, Scotland",
  ebayStore: "chaza87",
  specialization: "Scottish Aviation History • WWI & WWII Aircraft",
  
  biography: {
    short: "Renowned aviation historian specializing in Scottish aviation heritage, World War aircraft, and military aviation history.",
    
    full: "Charles E. MacKay is a distinguished aviation historian and author based in Glasgow, Scotland. With over 12 years of experience in aviation research and publishing, MacKay has established himself as a leading authority on Scottish aviation history and military aircraft of both World Wars. His extensive research focuses on the untold stories of Scottish aviation pioneers, the development of aircraft manufacturing in Scotland, and the crucial role Scottish aviators played in military conflicts. MacKay's work is particularly noted for its meticulous attention to detail and use of primary sources, including previously unpublished photographs, personal accounts, and archival documents. MacKay's publications have become essential references for aviation researchers, museum curators, and enthusiasts worldwide. His books are frequently cited in academic papers and have been praised for making complex aviation history accessible to both specialists and general readers. Beyond his writing, MacKay is an active member of several aviation history societies and regularly contributes to aviation journals. He has consulted for aviation museums and documentary productions, sharing his expertise on Scottish aviation heritage.",
    
    expertise: [
      "Scottish Aviation Heritage",
      "World War I Military Aircraft",
      "World War II Military Aircraft", 
      "Naval Aviation History",
      "Aviation Biography",
      "Industrial Aviation History",
      "Helicopter Development History"
    ],
    
    achievements: [
      "Published 20 authoritative books on aviation history",
      "Over 1,700 books sold to satisfied customers worldwide",
      "100% positive feedback from eBay customers",
      "Books used as primary references by aviation researchers globally",
      "Consulted by museums and documentary producers",
      "Member of multiple aviation history societies"
    ]
  },
  
  publications: {
    totalBooks: 20,
    categories: {
      "Scottish Aviation History": 3,
      "WWI Aviation": 3,
      "WWII Aviation": 3,
      "Aviation Biography": 5,
      "Helicopter History": 1,
      "Naval Aviation": 1,
      "Jet Age Aviation": 1,
      "Industrial History": 1,
      "Military History": 1
    },
    
    notableWorks: [
      {
        title: "Beardmore Aviation: The Story of a Scottish Industrial Giant's Aviation Department",
        significance: "Comprehensive history of Scotland's pioneering aircraft manufacturer"
      },
      {
        title: "Clydeside Aviation Volume One: The Great War",
        significance: "First detailed account of aviation activities on the Clyde during WWI"
      },
      {
        title: "The Sycamore Seeds: The Early History of the Helicopter",
        significance: "Groundbreaking research on early British helicopter development"
      }
    ]
  },
  
  researchInterests: [
    "Early Scottish aviation pioneers",
    "Aircraft manufacturing in Scotland",
    "Scottish military aviation heritage",
    "Personal accounts of aviators",
    "Technical development of military aircraft",
    "Aviation industrial history"
  ],
  
  contact: {
    email: SITE_CONSTANTS.AUTHOR_EMAIL,
    location: "Glasgow, Scotland",
    ebayStore: "chaza87",
    website: "charlesmackaybooks.com"
  }
};

export type Author = typeof authorData;
