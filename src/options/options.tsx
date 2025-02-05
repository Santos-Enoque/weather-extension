import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./options.css";
import "../styles/global.css";
import { Card, CardContent, Typography, TextField } from "@mui/material";
import { Button } from "../components/ui/button";
import {
  getStoradOptions,
  LocalStorageOptions,
  setStoradOptions,
} from "../utils/storage";
import { Loader2 } from "lucide-react";
type FormState = "ready" | "saving";
const Options = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");
  useEffect(() => {
    getStoradOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({ ...options, homeCity });
  };

  const handleSave = () => {
    setFormState("saving");
    setStoradOptions(options).then(() => {
      setInterval(() => {
        setFormState("ready");
      }, 500);
    });
  };

  if (!options) return null;
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <Card
        sx={{
          mx: "30%", // margin left and right
          my: "2%", // margin top and bottom
        }}
      >
        <CardContent>
          <div className="flex flex-col gap-y-4">
            <div>
              <Typography variant="h5">Weather Extension Options</Typography>
            </div>
            <div>
              <TextField
                placeholder="Enter your home city"
                label="Home City"
                variant="standard"
                fullWidth
                value={options.homeCity}
                onChange={(e) => {
                  handleHomeCityChange(e.target.value);
                }}
              />
            </div>
            <Button onClick={handleSave} disabled={formState === "saving"}>
              {formState === "saving" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Options"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Options />);
