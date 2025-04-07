import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

interface Question {
  id: string;
  text: string;
  type: "dropdown" | "text" | "checkbox" | "header" | "completeness";
  options?: string[];
  guidance?: string;
  remarks?: string;
  isSubquestion?: boolean;
  isHeader?: boolean;
}

interface QuestionFormProps {
  questions: Question[];
  domain: string;
  subdomain: string;
  onComplete: (domain: string, subdomain: string) => void;
  nextUrl?: string;
}

const QuestionForm = ({ questions, domain, subdomain, onComplete, nextUrl }: QuestionFormProps) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [importance, setImportance] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleImportanceChange = (questionId: string, value: string) => {
    setImportance((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId: string, checked: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: checked ? "Yes" : "No",
    }));
  };

  // Function to calculate completeness based on related subquestions
  const calculateCompleteness = (completenessId: string) => {
    // Extract the base ID (e.g., "p-rpt-10" from "p-rpt-10-completeness")
    const baseId = completenessId.replace("-completeness", "");
    
    // Find all related subquestions (questions with IDs starting with baseId and that are subquestions)
    const relatedQuestions = questions.filter(
      q => q.id.startsWith(baseId) && q.id !== completenessId && q.isSubquestion
    );
    
    if (relatedQuestions.length === 0) {
      return { text: "Incomplete", percentage: 0 };
    }
    
    // Check if these are dropdown questions with the specified options
    const hasSpecifiedOptions = relatedQuestions.some(q => 
      q.type === "dropdown" && 
      q.options?.join(",") === ["No", "Partially", "Averagely", "Mostly", "Fully"].join(",")
    );
    
    if (hasSpecifiedOptions) {
      // Calculate percentage based on the selected options
      let totalPoints = 0;
      let maxPoints = relatedQuestions.length * 4; // 4 is max points for "Fully"
      
      relatedQuestions.forEach(q => {
        const answer = answers[q.id];
        if (!answer) return;
        
        switch (answer) {
          case "Fully": totalPoints += 4; break;
          case "Mostly": totalPoints += 3; break;
          case "Averagely": totalPoints += 2; break;
          case "Partially": totalPoints += 1; break;
          case "No": totalPoints += 0; break;
        }
      });
      
      // Calculate percentage
      const percentage = maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
      
      // Determine text based on percentage
      let text = `${percentage}% Complete`;
      
      return { text, percentage };
    } else {
      // Original logic for Yes/No questions
      // Count answered questions (those with "Yes" answers)
      const answeredCount = relatedQuestions.filter(
        q => answers[q.id] === "Yes"
      ).length;
      
      // Calculate percentage
      const percentage = (answeredCount / relatedQuestions.length) * 100;
      
      // Determine text based on percentage
      let text = "Incomplete";
      if (percentage === 100) {
        text = "Fully Complete";
      } else if (percentage >= 75) {
        text = "Mostly Complete";
      } else if (percentage >= 50) {
        text = "Averagely Complete";
      } else if (percentage > 0) {
        text = "Partially Complete";
      }
      
      return { text, percentage };
    }
  };

  // Helper function to get color based on completion status
  const getCompletionColor = (status: string) => {
    switch (status) {
      case "Fully Complete":
        return "text-green-600";
      case "Mostly Complete":
        return "text-blue-600";
      case "Averagely Complete":
        return "text-yellow-600";
      case "Partially Complete":
        return "text-orange-600";
      case "Incomplete":
      default:
        return "text-gray-600";
    }
  };

  // Store completeness values separately to avoid infinite loops
  const [completenessValues, setCompletenessValues] = useState<Record<string, { text: string, percentage: number }>>({});

  // Update completeness fields whenever answers change
  useEffect(() => {
    // Find all completeness questions
    const completenessQuestions = questions.filter(
      q => q.text === "Completeness" && q.isSubquestion
    );
    
    // Calculate new completeness values
    const newCompletenessValues = { ...completenessValues };
    let hasChanges = false;
    
    completenessQuestions.forEach(question => {
      const completenessValue = calculateCompleteness(question.id);
      // Only update if the value has changed
      if (!newCompletenessValues[question.id] || 
          newCompletenessValues[question.id].percentage !== completenessValue.percentage) {
        newCompletenessValues[question.id] = completenessValue;
        hasChanges = true;
      }
    });
    
    // Only update state if there are changes
    if (hasChanges) {
      setCompletenessValues(newCompletenessValues);
    }
  }, [answers, questions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if all required questions have been answered
      const unanswered = questions
        .filter(q => q.type === "dropdown" && !q.isSubquestion) // Only check main questions, not subquestions
        .filter(q => !answers[q.id]);
      
      if (unanswered.length > 0) {
        toast.error(`Please answer all required questions before proceeding.`);
        setIsSubmitting(false);
        return;
      }

      // Simulate saving to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark this section as complete
      onComplete(domain, subdomain);
      
      toast.success("Section completed successfully!");
      
      // Navigate to the next section if provided
      if (nextUrl) {
        navigate(nextUrl);
      }
    } catch (error) {
      toast.error("Failed to save answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {questions.map((question) => (
          <Card 
            key={question.id} 
            className={`shadow-sm ${question.isSubquestion ? 'ml-8 border-l-4 border-l-blue-200' : ''}`}
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Label htmlFor={question.id} className={`text-base flex-1 ${question.isSubquestion ? 'font-normal' : question.isHeader ? 'font-semibold text-blue-700' : 'font-medium'}`}>
                    {question.text}
                  </Label>

                  {question.guidance && !question.isHeader && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-blue-500 cursor-help mt-1">
                            <Info className="h-4 w-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px] p-4">
                          <p className="text-sm">{question.guidance}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                
                {question.text === "Completeness" && question.isSubquestion ? (
                  <div className="mt-2">
                    <div className="p-3 rounded-md border">
                      <div className={`font-medium ${getCompletionColor(completenessValues[question.id]?.text || "Incomplete")}`}>
                        {completenessValues[question.id]?.text || "Incomplete"}
                      </div>
                      {completenessValues[question.id]?.percentage > 0 && (
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${completenessValues[question.id]?.percentage}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : question.type === "dropdown" && question.options && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={question.id} className="text-sm text-gray-600 mb-1 block">
                        Answer
                      </Label>
                      <Select
                        onValueChange={(value) => handleSelectChange(question.id, value)}
                        value={answers[question.id] || ""}
                        name={question.id}
                        disabled={question.text === "Completeness" && question.isSubquestion}
                      >
                        <SelectTrigger className="w-full" id={`${question.id}-answer`}>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          {question.options?.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          )) || 
                          // If this is a completeness field, provide the completeness options
                          (question.text === "Completeness" && question.isSubquestion && [
                            "Incomplete", 
                            "Partially Complete", 
                            "Averagely Complete", 
                            "Mostly Complete", 
                            "Fully Complete"
                          ].map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          )))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {!question.isSubquestion && (
                      <div>
                        <Label htmlFor={`${question.id}-importance`} className="text-sm text-gray-600 mb-1 block">
                          Importance
                        </Label>
                        <Select
                          onValueChange={(value) => handleImportanceChange(question.id, value)}
                          value={importance[question.id] || ""}
                          name={`${question.id}-importance`}
                        >
                          <SelectTrigger className="w-full" id={`${question.id}-importance`}>
                            <SelectValue placeholder="Select importance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                )}
                
                {question.type === "checkbox" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={question.id} 
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(question.id, checked === true)
                      }
                      checked={answers[question.id] === "Yes"}
                    />
                    <label
                      htmlFor={question.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Yes
                    </label>
                  </div>
                )}
                
                {question.type === "text" && !question.isHeader && (
                  <Textarea
                    id={question.id}
                    value={answers[question.id] || ""}
                    onChange={(e) => handleTextChange(question.id, e.target.value)}
                    placeholder={
                      question.text.includes("comments") || question.text.includes("Comments")
                        ? "Enter your comments here"
                        : "Enter your answer"
                    }
                    className="min-h-[100px]"
                  />
                )}

                {question.remarks && !question.isHeader && (
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mt-2">
                    <p className="text-sm text-gray-700">{question.remarks}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Previous
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-assessment-blue-600 hover:bg-assessment-blue-700"
          >
            {isSubmitting ? "Saving..." : nextUrl ? "Save & Continue" : "Complete Section"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QuestionForm;
