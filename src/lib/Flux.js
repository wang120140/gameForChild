var StepSubmits = {
  BOOTINDEXCOMP:"bootindexcompleted",
  INDEXCOMPLETED:"indexcompleted"

}


var Store = {
  lessonStepSubmitArr:[],
  vueInstance:null,
  gameData:null,
  themeType:null,
  gameThemeData:null,//记录主题的独立配置文件

  connectedXes: false,
  allLessonParts: [],
  completedParts: [],
  currentPartsIndex: -1,

}
class Flux {
    static pushStepSubmit($lessonName){
    if(Store.lessonStepSubmitArr.indexOf($lessonName) === -1){
      Store.lessonStepSubmitArr.push($lessonName);
    }
    
  }
  static deleteStepSubmit($lessonName){
      if(Store.lessonStepSubmitArr.indexOf($lessonName) !== -1){
        
      Store.lessonStepSubmitArr.splice(Store.lessonStepSubmitArr.indexOf($lessonName),1);
    }

  }
  static hasStepSubmit($lessonName){
    if(Store.lessonStepSubmitArr.indexOf($lessonName) !== -1){
      return true;
    }else{
      return false;
    }
  }
  static getStepSubmitArr(){
    return Store.lessonStepSubmitArr;
  }
  static setVueInstance($vue){
      Store.vueInstance = $vue;
  }
  static getVueInstance(){
     return Store.vueInstance;
  }
  static setGameThemeData($data){
    Store.gameThemeData = $data;
  }
  static getGameThemeData(){
    return Store.gameThemeData;
  }
  static setGameData($data){
    Store.gameData = $data;
  }
  static getGameData(){
    return Store.gameData;

  }
  static setThemeType($type){
    Store.themeType = $type;

  }
  static getThemeType(){
    return Store.themeType;
  }


  static setConnectedXes($b) {
    Store.connectedXes = $b;
  }
  static getConnectedXes() {
    return Store.connectedXes;
  }

  static setAnswerAcuPos($arr) {
    Store.answerAcupos = $arr;

  }
  static getAnswerAcuPos() {
    return Store.answerAcupos;
  }

  //操作课程列表;
  static pushCompletedParts(payload) {

    if (Store.completedParts.indexOf(payload) === -1) {
      Store.completedParts.push(payload);
    }

  }
  static pushUnlockedLesson(payload) {
    if (Store.unlockedLessonArr.indexOf(payload) === -1) {
      Store.unlockedLessonArr.push(payload);
    }
  }
  static getCompletedParts() {
    return Store.completedParts;

  }

}
export {Flux as default,StepSubmits};