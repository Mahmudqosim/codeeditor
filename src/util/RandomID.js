let words =
  "towardtheenDofthe19thceNturyItbecameclearthatatomsarenotindivIsibletheexisTenceofchaRacteristicatomicspeCtraofeleMentssuggestedthatAtomshaveinternAlstructuReandJJthomsonsdiscoVerYoftheneGativeLychargedElectronin1897showeDthatatOmscouldbetakenaPartintochargedparticles"

export default function getRandomId() {
  let randomId = []
  for (let i = 0; i <= 10; i++) {
    let randomNum = Math.floor(Math.random() * 267)
    randomId.push(randomNum)
    randomId.push(words[randomNum])
  }

  return randomId.join("")
}


