import feedback
import feedbackFactory

feedback_summative = feedback.Feedback(1,"hello","summative")
feedback_formative = feedback.Feedback(1,"hello world","formative")

f1 = feedbackFactory.FeedbackFactory.makeFeedback(feedback_summative)
f2 = feedbackFactory.FeedbackFactory.makeFeedback(feedback_formative)


f1.executeCeateFeedback()
f2.executeCeateFeedback()
