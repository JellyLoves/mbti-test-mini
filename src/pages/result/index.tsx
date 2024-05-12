import { View, Image } from "@tarojs/components";
import { AtButton } from "taro-ui";

import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.scss";
import headerBg from "../../assets/headerBg.jpeg";
import GlobalFooter from "../../components/GlobalFooter";
import questionResults from "../../data/question_results.json";
import questions from "../../data/qusetions.json";
import getBastQuestionResult from "../../utils/bizUtils";

/**
 * 测试结果页面
 */
export default () => {
  const answerList = Taro.getStorageSync("answerList");
  if (!answerList || answerList.length < 1) {
    Taro.showToast({
      title: "请先完成测试",
      icon: "error",
      duration: 3000,
    });
  }
  const result = getBastQuestionResult(answerList, questions, questionResults);

  return (
    <View className="resultPage">
      <View className="at-article__h1 title">{result.resultName}</View>
      <View className="at-article__h1 subTitle">{result.resultDesc}</View>
      <AtButton
        type="primary"
        className="enterBtn"
        circle
        onClick={() => {
          // 跳转到首页
          Taro.reLaunch({
            url: "/pages/index/index",
          });
        }}
      >
        返回主页
      </AtButton>
      <Image
        className="headerBg"
        src={headerBg}
        style={{ width: "100%" }}
        mode="aspectFill"
      />
      <GlobalFooter />
    </View>
  );
};
