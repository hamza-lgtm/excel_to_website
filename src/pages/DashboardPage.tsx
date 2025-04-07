
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BarChart4, ClipboardList, FileText, PlusCircle } from "lucide-react";

// Mock data for past assessments
const pastAssessments = [
  {
    id: "a123",
    name: "Q1 2023 Assessment",
    date: "January 15, 2023",
    completionRate: 100,
  },
  {
    id: "b456",
    name: "Q3 2022 Assessment",
    date: "October 5, 2022",
    completionRate: 100,
  },
];

const DashboardPage = () => {
  const [user] = useState({
    name: "Alex Johnson",
    organization: "Acme Corp",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-assessment-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Assessment Dashboard</h1>
              <p className="text-assessment-blue-100">
                Welcome back, {user.name} | {user.organization}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild variant="secondary">
                <Link to="/assessment">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Assessment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Assessment Stats Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Assessment Statistics</CardTitle>
              <CardDescription>
                Your assessment activity overview
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-assessment-blue-600">2</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500">In Progress</p>
                  <p className="text-2xl font-bold text-assessment-blue-600">0</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/assessment">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  Start New Assessment
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/results/latest">
                  <BarChart4 className="mr-2 h-4 w-4" />
                  View Latest Results
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Reports
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Profile Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-500">Organization</p>
                <p className="font-medium">{user.organization}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/profile">Edit Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Past Assessments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Past Assessments</h2>
          
          {pastAssessments.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="min-w-full divide-y divide-gray-200">
                <div className="bg-gray-50 grid grid-cols-3 text-gray-500 text-sm">
                  <div className="px-6 py-3 text-left font-medium">Name</div>
                  <div className="px-6 py-3 text-left font-medium">Date</div>
                  <div className="px-6 py-3 text-left font-medium">Actions</div>
                </div>
                <div className="bg-white divide-y divide-gray-200">
                  {pastAssessments.map((assessment) => (
                    <div key={assessment.id} className="grid grid-cols-3">
                      <div className="px-6 py-4 flex items-center">
                        <span className="font-medium">{assessment.name}</span>
                      </div>
                      <div className="px-6 py-4">
                        {assessment.date}
                      </div>
                      <div className="px-6 py-4 flex items-center space-x-2">
                        <Button size="sm" asChild>
                          <Link to={`/results/${assessment.id}`}>View Results</Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/reports/${assessment.id}`}>Download</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-gray-500">You haven't completed any assessments yet.</p>
                <div className="mt-4">
                  <Button asChild>
                    <Link to="/assessment">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Start Your First Assessment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
