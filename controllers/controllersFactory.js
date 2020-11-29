exports.getAll = (Model) => {
    return async (req, res, next) => {
        const docs = await Model.find();

        console.log(Model);

        res.status(200).json({
            status: 'success',
            results: docs.length,
            data: { docs }
        });
    };
};

exports.getOne = (Model, populateOptions) => {
    return async (req, res, next) => {
        let query = Model.findById(req.params.id);

        if (populateOptions) {
            for (const option of populateOptions) {
                query = query.populate(option);
            }
        } else if (Model.modelName === 'Course') {
            const { textPopulate, videosPopulate, testsPopulate } = req.query;

            if (textPopulate) query = query.populate('materials.texts');
            if (videosPopulate) query = query.populate('materials.videos');
            if (testsPopulate) query = query.populate('materials.tests');
        }

        const doc = await query;

        if (!doc) {
            return res.status(404).json({
                status: 'fail',
                message: 'No doc found with that id'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { doc }
        });
    };
};

exports.createOne = (Model) => {
    return async (req, res, next) => {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            message: 'New doc successfully added',
            data: { doc }
        });
    };
};

exports.updateOne = (Model) => {
    return async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return res.status(404).json({
                status: 'fail',
                message: 'No doc found with that id'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { doc }
        });
    };
};

exports.deleteOne = (Model) => {
    return async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return res.status(404).json({
                status: 'fail',
                message: 'No doc found with that id'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    };
};
