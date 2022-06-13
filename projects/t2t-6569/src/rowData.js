const dummyData = [
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Removing follow up. Claims returned twice as incomplete.",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Missing Signature",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Called (979)776-5631 (JADE). Spoke with Emily. Emily confirmed that she had been the one to complete the request. She noted that they were not going to look at all the codes to see if they were aplicable that it is not something the doctor is going to do. She said they only have the codes that they put on the claim form. I noted if there were other codes then that they did not agree with or were not comfortable agreeing to (she mentioned some may not have been from them) that they can cross them off. She said this is just not something they do. I let her know if they were not wanting to move forward with this that I could make note of that. She said she would check with the doctor. She also had some questions and I did my best to answer those for her. She said I could call her back on Friday before noon to see what they were going to do.",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Called (979)776-5631 (JADE). Left a voicemail message explaining my call nad requesting a call back. I noted that I needed some clarification on the request they had sent back to us. ",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Called (979)776-5631 (JADE). Spoke with Emily. I am not sure she could hear me and hung up. I called again. Spoke with Kelsey. She was not able to verify the information completed on the request and noted that Becky was in clinic. SHe took my name, number , and why I was calling and said she would have her call me when she was done. ",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Clarification needed – see email",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Claim Info Missing",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Claims were returned before rep was able to call and confirm",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      '9/28/2021 11:29:43 AM Transmission Record Sent to 9797764790 with remote ID "979 776 4790" Result: (0/339;0/0) Success Page record: 1 - 11',
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "1st Send",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Fax# 979-776-4790",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "Test Fax 1 - 979-776-4790 + Cover",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Updated providerkey 687393788466364425 alt contact 1 altcontactkey 695002439313227785 info to lastname:, firstname:Becky - Nurse, address1:ST JOSEPH GENERAL SURGERY, address2:, city:, state:, zip:, phone:9797765631, ext:, fax:9797764790, email:, memo:",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Updated providerkey 687393788466364425 alt contact 1 altcontactkey 695002439313227785 info to lastname:, firstname:Becky - Nurse, address1:, address2:, city:, state:, zip:, phone:9797765631, ext:, fax:9797764790, email:, memo:",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Called (979)776-5631 (JADE). Spoke with Sophie. Confirmed that MICHAEL STEINES currently practices at ST JOSEPH GENERAL SURGERY (there is an affiliation with ST JOSEPH REGIONAL HEALTH CENTER) at 2700 E 29TH ST STE 105 BRYAN, TX 77802. Confirmed the best fax number to use is 979-776-4790. ATTN: BECKY. Becky is the nurse. Confirmed the best phone number to follow-up is (979)776-5631. They did not have an email address available.",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote: "",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "If you live in a past dream, you don't enjoy what is happening right now because you will always wish it to be different than it is. There is no time to miss anyone or anything because you are alive. Not enjoying what is happening right now is living in the past and being only half alive. This leads to self pity, suffering and tears.",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Many of us are slaves to our minds. Our own mind is our worst enemy. We try to focus, and our mind wanders off. We try to keep stress at bay, but anxiety keeps us awake at night. We try to be good to the people we love, but then we forget them and put ourselves first. ",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "And when we want to change our life, we dive into spiritual practice and expect quick results, only to lose focus after the honeymoon has worn off. We return to our state of bewilderment.",
  },
  {
    name: "Victor",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "If you live in a past dream, you don't enjoy what is happening right now because you will always wish it to be different than it is. There is no time to miss anyone or anything because you are alive. Not enjoying what is happening right now is living in the past and being only half alive. This leads to self pity, suffering and tears.",
  },
  {
    name: "Tom",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "Many of us are slaves to our minds. Our own mind is our worst enemy. We try to focus, and our mind wanders off. We try to keep stress at bay, but anxiety keeps us awake at night. We try to be good to the people we love, but then we forget them and put ourselves first. ",
  },
  {
    name: "Kiz",
    addeddate: "2022-05-20T17:55:04.717Z",
    quote:
      "And when we want to change our life, we dive into spiritual practice and expect quick results, only to lose focus after the honeymoon has worn off. We return to our state of bewilderment.",
  },
];

export default dummyData;
