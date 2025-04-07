import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ResultsSharing = () => {
  return (
    <div className="space-y-6">
      <div className="bg-assessment-blue-50 p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-3">Introduction</h3>
        <p className="text-sm text-gray-700 mb-3">
          Sharing your assessment results with SOC-CMM will help to create a global benchmark of SOC capability and can help to identify and correct overviews. This information is anonymously 
          used to improve the SOC-CMM tools to create new resources and guidance for the SOC community to address topics that are coming in lower maturity rates. The information will also used as 
          part of a broader benchmarking database to report on SOC maturity trends.
        </p>
        <p className="text-sm text-gray-700 mb-3">
          This sheet is filled automatically using the information provided in the SOC-CMM:
          <br />- The profile information is taken from the 'profile' section of the SOC-CMM
          <br />- The scoring information is copied from the results sheet
        </p>
        <p className="text-sm text-gray-700">
          Follow the instructions below to share your results with SOC-CMM:
        </p>
      </div>

      <div className="bg-assessment-blue-50 p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-3">Privacy</h3>
        <p className="text-sm text-gray-700">
          Shared results will be stored in the SOC-CMM database. Results are used in aggregated form and can not be traced back to individual organizations. You will not be contacted 
          regarding your results, unless you explicitly provide your consent to do so.
        </p>
      </div>

      <div className="bg-assessment-blue-50 p-6 rounded-md">
        <h3 className="text-lg font-semibold mb-3">Instructions</h3>
        <p className="text-sm text-gray-700">
          Sharing the results can be done through printing this sheet on a PDF. The printing setup has already been defined and contains only the table below. Simply press CTRL+P, print as PDF 
          and send the PDF to support@soc-cmm.com. If there are certain pieces of information in the chart that you do not wish to share, simply remove them from this page by going to the 
          respective cell and pressing the delete button.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessment results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-semibold mb-3">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="contact">May we contact you regarding your scoring?</Label>
                  <Input id="contact" placeholder="Yes" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">If yes please provide your email address</Label>
                  <Input id="email" placeholder="" className="mt-1" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold mb-3">SOC & Organizational Profile</h3>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="assessment-date">Assessment date</Label>
                  <Input id="assessment-date" placeholder="MM/DD/YYYY (MM-DD-YYYY Format)" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="assessment-type">Select assessment type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="organization-type">Select your organization type</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private Sector</SelectItem>
                      <SelectItem value="nonprofit">Non-profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="organization-sector">What is your organization's sector?</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSharing;
