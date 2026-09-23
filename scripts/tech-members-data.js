// Technical crew data, kept next to members-data.js so both the page
// generators and the shared search index can read from one source.
const TECH_MEMBERS = [
  {
    id: "juju",
    name: "쥬쥬",
    roles: ["믹싱"],
    color: "#667AFF",
    colorLabel: "파란색",
    message: "잘 부탁드립니다!!",
    image: "img/tech/juju.webp",
    links: [
      { label: "YouTube", icon: "smart_display", url: "https://youtube.com/@hisojj-515?si=taljW0CA7sQBeEJH" },
      { label: "X", icon: "alternate_email", url: "https://x.com/_hisojj__" },
    ],
  },
  {
    id: "banz",
    name: "반즈",
    fullName: "BANZ",
    roles: ["일러레"],
    color: "#BDCCD6",
    colorLabel: "푸른색",
    message: "열심히 하겠습니다! 잘 부탁 드려용~",
    image: "img/tech/banz.webp",
    links: [
      { label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@banz_601" },
      { label: "Littly", icon: "link", url: "https://litt.ly/banz" },
    ],
  },
  {
    id: "parin",
    name: "파린",
    roles: ["개발(프로그래밍 등)", "기획"],
    color: "#E0F7FA",
    colorLabel: "청색 계열",
    message: "잘부탁드립니다",
    image: "img/tech/parin.webp",
    links: [
      { label: "CHZZK", icon: "live_tv", url: "https://chzzk.parin.asia/" },
      { label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@koroutine" },
      { label: "X", icon: "alternate_email", url: "https://x.com/palin1838982" },
    ],
  },
  {
    id: "n",
    name: "엔",
    fullName: "N",
    roles: ["일러스트"],
    color: "#A8968D",
    colorLabel: "연갈색",
    message: "안녕하세요",
    image: "img/tech/n.webp",
    links: [],
  },
  {
    id: "cloud",
    name: "cloud",
    roles: ["편집"],
    color: "#000DFF",
    colorLabel: "메인 컬러",
    message: "잘 부탁드립니다",
    image: "img/tech/cloud.webp",
    links: [{ label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@Cloud_11115" }],
  },
  {
    id: "oliva",
    name: "올리바",
    roles: ["편집자"],
    color: "#A01313",
    colorLabel: "메인 컬러",
    message: "열심히 하겠습니다",
    image: "img/tech/oliva.webp",
    links: [{ label: "YouTube", icon: "smart_display", url: "https://www.youtube.com/@올리바O/videos" }],
  },
];

module.exports = { TECH_MEMBERS };
