import { Request, Response } from "express";
import { Parser } from "json2csv";

import asyncHandler from "../utils/asyncHandler";
import Lead from "../models/lead.model";

import {
  createLeadSchema,
  updateLeadSchema,
} from "../validations/lead.validation";

export const createLead = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData =
      createLeadSchema.parse(req.body);

    const lead = await Lead.create({
      ...validatedData,
      createdBy: req.user?._id,
    });

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead,
    });
  }
);

export const getLeads = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      status,
      source,
      search,
      sort = "latest",
      page = "1",
    } = req.query;

    const limit = 10;

    const currentPage = Number(page);

    const skip =
      (currentPage - 1) * limit;

    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption: {
      createdAt: 1 | -1;
    } =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const leads = await Lead.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email");

    const totalLeads =
      await Lead.countDocuments(filter);

    res.status(200).json({
      success: true,
      total: totalLeads,
      currentPage,
      totalPages: Math.ceil(
        totalLeads / limit
      ),
      leads,
    });
  }
);

export const getSingleLead = asyncHandler(
  async (req: Request, res: Response) => {
    const lead = await Lead.findById(
      req.params.id
    ).populate(
      "createdBy",
      "name email"
    );

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      lead,
    });
  }
);

export const updateLead = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData =
      updateLeadSchema.parse(req.body);

    const updatedLead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        validatedData,
        {
          new: true,
        }
      );

    if (!updatedLead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  }
);

export const deleteLead = asyncHandler(
  async (req: Request, res: Response) => {
    const deletedLead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!deletedLead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  }
);

export const exportLeadsCSV = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      status,
      source,
      search,
      sort = "latest",
    } = req.query;

    const filter: any = {};

    if (status) {
      filter.status = status;
    }

    if (source) {
      filter.source = source;
    }

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortOption: {
      createdAt: 1 | -1;
    } =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 };

    const leads = await Lead.find(filter)
      .sort(sortOption)
      .select(
        "name email status source createdAt"
      );

    const fields = [
      "name",
      "email",
      "status",
      "source",
      "createdAt",
    ];

    const json2csvParser = new Parser({
      fields,
    });

    const csv =
      json2csvParser.parse(leads);

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment("leads.csv");

    res.status(200).send(csv);
  }
);